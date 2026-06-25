import * as dotenv from 'dotenv';
dotenv.config();

import * as fs from 'fs';
import * as path from 'path';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { z } from 'zod';

const adapter = new PrismaPg({ connectionString: process.env['DATABASE_URL'] });
const prisma = new PrismaClient({ adapter });

const INPUT_PATH = path.join(__dirname, 'data', 'quotes-generated.json');

const quoteSchema = z.object({
  text: z.string(),
  textRu: z.string(),
  author: z.string(),
  authorRu: z.string(),
  theme: z.string(),
});

const quoteListSchema = z.array(quoteSchema);

async function main(): Promise<void> {
  const raw = fs.readFileSync(INPUT_PATH, 'utf-8');
  const result = quoteListSchema.safeParse(JSON.parse(raw));
  if (!result.success) {
    throw new Error(`Invalid quote data in ${INPUT_PATH}: ${result.error.message}`);
  }
  const quotes = result.data;

  process.stdout.write(`Seeding ${quotes.length} quotes...\n`);

  for (const quote of quotes) {
    await prisma.quote.upsert({
      where: { text_author: { text: quote.text, author: quote.author } },
      update: {
        textRu: quote.textRu,
        authorRu: quote.authorRu,
        theme: quote.theme,
      },
      create: {
        text: quote.text,
        textRu: quote.textRu,
        author: quote.author,
        authorRu: quote.authorRu,
        theme: quote.theme,
      },
    });
  }

  process.stdout.write(`Seeded ${quotes.length} quotes.\n`);
}

main()
  .catch((e) => {
    process.stderr.write(`${e}\n`);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
