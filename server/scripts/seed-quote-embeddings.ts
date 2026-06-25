import * as dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { getEmbeddings } from "../src/lib/voyage";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const BATCH_SIZE = 50;

if (!process.env.VOYAGE_API_KEY) {
  process.stderr.write("VOYAGE_API_KEY is not set in .env\n");
  process.exit(1);
}

type Quote = { id: string; text: string; author: string };

function buildEmbeddingText(quote: Quote): string {
  return `${quote.text} — ${quote.author}`;
}

async function saveBatch(quotes: Quote[], embeddings: number[][]): Promise<void> {
  for (let i = 0; i < quotes.length; i++) {
    const vector = embeddings[i];
    if (!vector.every(isFinite)) {
      throw new Error(`Invalid embedding values for quote ${quotes[i].id}`);
    }
    const vectorStr = `[${vector.join(",")}]`;
    await prisma.$executeRaw`
      UPDATE "Quote" SET embedding = ${vectorStr}::vector WHERE id = ${quotes[i].id}
    `;
  }
}

async function embedBatch(quotes: Quote[], index: number, total: number): Promise<void> {
  process.stdout.write(`Batch ${index}: embedding ${quotes.length} quotes...\n`);
  const embeddings = await getEmbeddings(quotes.map(buildEmbeddingText), "document");
  await saveBatch(quotes, embeddings);
  process.stdout.write(`Progress: ${index * BATCH_SIZE}/${total}\n`);
}

async function main() {
  const quotes = await prisma.quote.findMany({
    select: { id: true, text: true, author: true },
  });

  process.stdout.write(`Found ${quotes.length} quotes\n`);

  for (let i = 0; i < quotes.length; i += BATCH_SIZE) {
    await embedBatch(quotes.slice(i, i + BATCH_SIZE), Math.floor(i / BATCH_SIZE) + 1, quotes.length);
  }

  const result = await prisma.$queryRaw<{ count: bigint }[]>`
    SELECT COUNT(*) as count FROM "Quote" WHERE embedding IS NOT NULL
  `;
  process.stdout.write(`Done! ${result[0].count}/${quotes.length} quotes have embeddings\n`);
}

main()
  .catch((err) => process.stderr.write(`${err}\n`))
  .finally(() => prisma.$disconnect());
