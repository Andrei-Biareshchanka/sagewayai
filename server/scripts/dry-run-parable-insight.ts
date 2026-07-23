import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { generateParableInsight, getInsightLens, countWords } from '../src/lib/anthropic';

const adapter = new PrismaPg({ connectionString: process.env['DATABASE_URL']! });
const prisma = new PrismaClient({ adapter });

const SAMPLE_TITLES = ['The Two Wolves', 'The Cracked Pot'];

async function main() {
  // parableIndexInDb is this parable's position in a stable, deterministic
  // ordering of the whole table (id ascending) — used only to pick a lens,
  // not a meaningful sequence otherwise.
  const allIds = (await prisma.parable.findMany({ select: { id: true }, orderBy: { id: 'asc' } })).map((p) => p.id);

  const parables = await prisma.parable.findMany({
    where: { title: { in: SAMPLE_TITLES } },
    include: {
      quotes: {
        where: { isPrimary: true },
        include: { quote: true },
      },
    },
  });

  for (const parable of parables) {
    const primary = parable.quotes[0]?.quote;
    if (!primary) {
      console.log(`SKIP "${parable.title}" — no primary quote assigned.`);
      continue;
    }
    if (!parable.titleRu || !parable.contentRu || !parable.moralRu) {
      console.log(`SKIP "${parable.title}" — missing RU fields, cannot ground RU generation.`);
      continue;
    }

    const parableIndexInDb = allIds.indexOf(parable.id);
    const lens = getInsightLens(parableIndexInDb);

    console.log(`\n${'='.repeat(80)}\n${parable.title} (lens: ${lens.key})\n${'='.repeat(80)}`);

    const en = await generateParableInsight(
      { text: primary.text, author: primary.author },
      { title: parable.title, content: parable.content, moral: parable.moral },
      'en',
      lens,
    );
    console.log(`\n--- EN (${countWords(en.conclusion)} words) ---\n${en.conclusion}\n`);
    console.log('Questions:');
    en.questions.forEach((q, i) => console.log(`  ${i + 1}. ${q}`));

    // RU generation is grounded on the parable's own Russian fields (titleRu/contentRu/moralRu)
    // and the quote's Russian text, not the English fields — this is the fix for the bug where
    // dailyDigest.ts's buildParableText always fed English parable text into the RU call.
    const ru = await generateParableInsight(
      { text: primary.textRu ?? primary.text, author: primary.authorRu ?? primary.author },
      { title: parable.titleRu, content: parable.contentRu, moral: parable.moralRu },
      'ru',
      lens,
    );
    console.log(`\n--- RU (${countWords(ru.conclusion)} words) ---\n${ru.conclusion}\n`);
    console.log('Вопросы:');
    ru.questions.forEach((q, i) => console.log(`  ${i + 1}. ${q}`));
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
