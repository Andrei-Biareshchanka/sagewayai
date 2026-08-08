import { prisma } from '../src/lib/prisma';
import { findValidationIssue, reviewDeepReflection, countWords } from '../src/lib/anthropic';

// Retroactively runs the exact real-pipeline checks (findValidationIssue +
// reviewDeepReflection, a real Haiku API call) against already-REVIEWED
// parables — for auditing any batch whose conclusion/questions were written
// by hand (e.g. an Opus subagent in a Claude Code session) rather than
// through generateReviewedParableInsight, to see whether they'd actually
// have passed the real gate.
//
// Usage: npx tsx scripts/audit-manual-insights.ts <slugRu> [<slugRu> ...]
//        npx tsx scripts/audit-manual-insights.ts             (audits every REVIEWED parable)
const SLUGS = process.argv.slice(2);

type LangResult = {
  codeIssue: string | null;
  words: number;
  reviewPass: boolean;
  reviewScore: number;
  reviewViolations: string[];
};

async function auditLanguage(
  conclusion: string,
  questions: unknown,
  language: 'en' | 'ru',
): Promise<LangResult> {
  const codeIssue = findValidationIssue({ conclusion, questions }, language);
  const review = await reviewDeepReflection(conclusion, questions as string[], language);
  return {
    codeIssue,
    words: countWords(conclusion),
    reviewPass: review.pass,
    reviewScore: review.score,
    reviewViolations: review.violations,
  };
}

async function main() {
  const parables = await prisma.parable.findMany({
    where: SLUGS.length > 0 ? { slugRu: { in: SLUGS } } : { reflectionStatus: 'REVIEWED' },
    select: {
      title: true,
      slugRu: true,
      conclusionEn: true,
      conclusionRu: true,
      questionsEn: true,
      questionsRu: true,
    },
  });

  let fullyPassed = 0;
  const report: string[] = [];

  for (const p of parables) {
    const en = await auditLanguage(p.conclusionEn ?? '', p.questionsEn, 'en');
    const ru = await auditLanguage(p.conclusionRu ?? '', p.questionsRu, 'ru');

    const bothPassed = !en.codeIssue && en.reviewPass && !ru.codeIssue && ru.reviewPass;
    if (bothPassed) fullyPassed++;

    report.push(`\n${'='.repeat(70)}\n${p.title} (${p.slugRu})`);
    report.push(
      `  EN: ${en.words}w | code: ${en.codeIssue ?? 'OK'} | review: ${en.reviewPass ? 'PASS' : 'FAIL'} (score ${en.reviewScore})${en.reviewViolations.length ? ` | violations: ${en.reviewViolations.join('; ')}` : ''}`,
    );
    report.push(
      `  RU: ${ru.words}w | code: ${ru.codeIssue ?? 'OK'} | review: ${ru.reviewPass ? 'PASS' : 'FAIL'} (score ${ru.reviewScore})${ru.reviewViolations.length ? ` | violations: ${ru.reviewViolations.join('; ')}` : ''}`,
    );
    report.push(`  => ${bothPassed ? 'WOULD PASS the real pipeline' : 'WOULD NOT PASS the real pipeline'}`);
  }

  console.log(report.join('\n'));
  console.log(`\n${'='.repeat(70)}\nSUMMARY: ${fullyPassed}/${parables.length} would fully pass the real pipeline (code checks + Haiku review, both languages).`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
