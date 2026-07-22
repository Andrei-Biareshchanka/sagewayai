import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import {
  generateReviewedParableInsight,
  generateParableImageBrief,
  getInsightLens,
  countWords,
  ParableInsightGenerationError,
  type TokenUsage,
} from '../src/lib/anthropic';

const adapter = new PrismaPg({ connectionString: process.env['DATABASE_URL']! });
const prisma = new PrismaClient({ adapter });

// Hard-limited to 5 for this run — raising this requires an explicit
// go-ahead after reviewing this batch's quality and real cost.
const BATCH_SIZE = 5;

const OPUS_PRICE_PER_MTOK = { input: 5, output: 25 };
const SONNET_PRICE_PER_MTOK = { input: 3, output: 15 };
const HAIKU_PRICE_PER_MTOK = { input: 1, output: 5 };

const ZERO: TokenUsage = { inputTokens: 0, outputTokens: 0 };

function cost(usage: TokenUsage, price: { input: number; output: number }): number {
  return (usage.inputTokens / 1_000_000) * price.input + (usage.outputTokens / 1_000_000) * price.output;
}

function sumUsage(a: TokenUsage, b: TokenUsage): TokenUsage {
  return { inputTokens: a.inputTokens + b.inputTokens, outputTokens: a.outputTokens + b.outputTokens };
}

type ParableReport = {
  title: string;
  lens: string;
  en: { conclusion: string; questions: string[]; words: number; passed: boolean; attempts: number };
  ru: { conclusion: string; questions: string[]; words: number; passed: boolean; attempts: number };
  imagePromptEn: string;
  imageAltEn: string;
  imageAltRu: string;
  status: 'REVIEWED' | 'GENERATED';
};

async function main() {
  const allIds = (await prisma.parable.findMany({ select: { id: true }, orderBy: { id: 'asc' } })).map((p) => p.id);

  const parables = await prisma.parable.findMany({
    where: { reflectionStatus: 'DRAFT' },
    orderBy: { id: 'asc' },
    take: BATCH_SIZE,
    include: {
      quotes: { where: { isPrimary: true }, include: { quote: true } },
    },
  });

  console.log(`Processing ${parables.length} parable(s) with reflectionStatus=DRAFT (batch size ${BATCH_SIZE}).\n`);

  let totalInsightUsage = ZERO;
  let totalReviewUsage = ZERO;
  let totalImageUsage = ZERO;
  let processedCount = 0;
  let failedCount = 0;
  let manualQueueCount = 0;
  let passedFirstTryCount = 0;
  let passedAfterRegenCount = 0;

  const reports: ParableReport[] = [];

  for (const parable of parables) {
    const primary = parable.quotes[0]?.quote;
    if (!primary) {
      console.log(`SKIP "${parable.title}" — no primary quote assigned.`);
      continue;
    }
    if (!parable.titleRu || !parable.contentRu || !parable.moralRu) {
      console.log(`SKIP "${parable.title}" — missing RU fields.`);
      continue;
    }

    const parableIndexInDb = allIds.indexOf(parable.id);
    const lens = getInsightLens(parableIndexInDb);
    console.log(`\n=== "${parable.title}" (lens: ${lens.key}) ===`);

    try {
      const en = await generateReviewedParableInsight(
        { text: primary.text, author: primary.author },
        { title: parable.title, content: parable.content, moral: parable.moral },
        'en',
        lens,
      );
      const ru = await generateReviewedParableInsight(
        { text: primary.textRu ?? primary.text, author: primary.authorRu ?? primary.author },
        { title: parable.titleRu, content: parable.contentRu, moral: parable.moralRu },
        'ru',
        lens,
      );
      const imageBrief = await generateParableImageBrief({
        title: parable.title,
        content: parable.content,
        moral: parable.moral,
      });

      totalInsightUsage = sumUsage(sumUsage(totalInsightUsage, en.insightUsage), ru.insightUsage);
      totalReviewUsage = sumUsage(sumUsage(totalReviewUsage, en.reviewUsage), ru.reviewUsage);
      totalImageUsage = sumUsage(totalImageUsage, imageBrief.usage);

      const bothPassed = en.passed && ru.passed;
      const status: ParableReport['status'] = bothPassed ? 'REVIEWED' : 'GENERATED';
      if (bothPassed) {
        if (en.attemptsUsed === 1 && ru.attemptsUsed === 1) passedFirstTryCount++;
        else passedAfterRegenCount++;
      } else {
        manualQueueCount++;
      }

      // reflectionStatus=GENERATED (not REVIEWED) when either language failed the
      // review gate after all regeneration attempts — per spec, not auto-published,
      // routed to a manual queue instead. reflectionUpdatedAt timestamps this run.
      await prisma.parable.update({
        where: { id: parable.id },
        data: {
          conclusionEn: en.insight.conclusion,
          questionsEn: en.insight.questions,
          conclusionRu: ru.insight.conclusion,
          questionsRu: ru.insight.questions,
          imageAltEn: imageBrief.imageAltEn,
          imageAltRu: imageBrief.imageAltRu,
          imagePromptEn: imageBrief.imagePromptEn,
          reflectionStatus: status,
          reflectionUpdatedAt: new Date(),
        },
      });

      processedCount++;
      reports.push({
        title: parable.title,
        lens: lens.key,
        en: {
          conclusion: en.insight.conclusion,
          questions: en.insight.questions,
          words: countWords(en.insight.conclusion),
          passed: en.passed,
          attempts: en.attemptsUsed,
        },
        ru: {
          conclusion: ru.insight.conclusion,
          questions: ru.insight.questions,
          words: countWords(ru.insight.conclusion),
          passed: ru.passed,
          attempts: ru.attemptsUsed,
        },
        imagePromptEn: imageBrief.imagePromptEn,
        imageAltEn: imageBrief.imageAltEn,
        imageAltRu: imageBrief.imageAltRu,
        status,
      });

      console.log(`  EN: ${en.passed ? 'PASSED' : 'MANUAL QUEUE'} (attempt ${en.attemptsUsed}/3)`);
      console.log(`  RU: ${ru.passed ? 'PASSED' : 'MANUAL QUEUE'} (attempt ${ru.attemptsUsed}/3)`);
      console.log(`  status -> ${status}`);
    } catch (error) {
      if (error instanceof ParableInsightGenerationError) {
        console.log(`  FAILED (code-level, after ${error.attempts} attempts): ${error.message}`);
        console.log(`  raw last response: ${JSON.stringify(error.lastRawResponse)}`);
        await prisma.parable.update({
          where: { id: parable.id },
          data: { reflectionStatus: 'FAILED', reflectionUpdatedAt: new Date() },
        });
        failedCount++;
        continue;
      }
      throw error;
    }
  }

  console.log(`\n${'='.repeat(80)}\nBACKFILL REPORT\n${'='.repeat(80)}`);
  console.log(`Processed: ${processedCount}/${parables.length}`);
  console.log(`FAILED (code-level, after 3 attempts): ${failedCount}`);
  console.log(`Manual queue (review gate failed after regeneration): ${manualQueueCount}`);
  console.log(`Passed review gate on first try: ${passedFirstTryCount}`);
  console.log(`Passed review gate after regeneration: ${passedAfterRegenCount}`);

  for (const r of reports) {
    console.log(`\n${'-'.repeat(80)}\n${r.title} (lens: ${r.lens}) — status: ${r.status}`);
    console.log(`\n[EN] (${r.en.words} words, ${r.en.passed ? 'PASSED' : 'MANUAL QUEUE'}, attempt ${r.en.attempts}/3)\n${r.en.conclusion}`);
    console.log('Questions:');
    r.en.questions.forEach((q, i) => console.log(`  ${i + 1}. ${q}`));
    console.log(`\n[RU] (${r.ru.words} words, ${r.ru.passed ? 'PASSED' : 'MANUAL QUEUE'}, attempt ${r.ru.attempts}/3)\n${r.ru.conclusion}`);
    console.log('Questions (RU):');
    r.ru.questions.forEach((q, i) => console.log(`  ${i + 1}. ${q}`));
    console.log(`\n[IMAGE PROMPT EN]\n${r.imagePromptEn}`);
    console.log(`\n[IMAGE ALT EN] ${r.imageAltEn}`);
    console.log(`[IMAGE ALT RU] ${r.imageAltRu}`);
  }

  const insightCost = cost(totalInsightUsage, OPUS_PRICE_PER_MTOK);
  const reviewCost = cost(totalReviewUsage, HAIKU_PRICE_PER_MTOK);
  const imageCost = cost(totalImageUsage, SONNET_PRICE_PER_MTOK);
  const textCost = insightCost + reviewCost;

  console.log(`\n${'='.repeat(80)}\nCOST REPORT\n${'='.repeat(80)}`);
  console.log(
    `Insight generation (Opus 4.8, $5/$25 per MTok): ${totalInsightUsage.inputTokens} in / ${totalInsightUsage.outputTokens} out -> $${insightCost.toFixed(4)}`,
  );
  console.log(
    `Review gate (Haiku 4.5, $1/$5 per MTok): ${totalReviewUsage.inputTokens} in / ${totalReviewUsage.outputTokens} out -> $${reviewCost.toFixed(4)}`,
  );
  console.log(`Text total: $${textCost.toFixed(4)}`);
  console.log(
    `Image briefs (Sonnet 4.6, $3/$15 per MTok): ${totalImageUsage.inputTokens} in / ${totalImageUsage.outputTokens} out -> $${imageCost.toFixed(4)}`,
  );
  console.log(`GRAND TOTAL: $${(textCost + imageCost).toFixed(4)}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
