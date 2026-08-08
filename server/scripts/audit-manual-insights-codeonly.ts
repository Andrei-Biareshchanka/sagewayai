import { prisma } from '../src/lib/prisma';
import { findValidationIssue, countWords } from '../src/lib/anthropic';

// Free, local-only check (no API calls): findValidationIssue only covers
// schema shape, tool-call-artifact leakage, and mixed-Cyrillic/Latin words —
// it does NOT check word count or em-dash count (those live only inside the
// Haiku review-gate prompt, not as a standalone code check).
//
// Usage: npx tsx scripts/audit-manual-insights-codeonly.ts <slugRu> [<slugRu> ...]
//        npx tsx scripts/audit-manual-insights-codeonly.ts               (audits every REVIEWED parable)
const SLUGS = process.argv.slice(2);

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

  for (const p of parables) {
    const enIssue = findValidationIssue({ conclusion: p.conclusionEn, questions: p.questionsEn }, 'en');
    const ruIssue = findValidationIssue({ conclusion: p.conclusionRu, questions: p.questionsRu }, 'ru');
    console.log(`\n${p.title} (${p.slugRu})`);
    console.log(`  EN: ${countWords(p.conclusionEn ?? '')}w | code check: ${enIssue ?? 'OK'}`);
    console.log(`  RU: ${countWords(p.conclusionRu ?? '')}w | code check: ${ruIssue ?? 'OK'}`);
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
