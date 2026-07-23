import * as dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { getEmbeddings } from "../src/lib/voyage";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const BATCH_SIZE = 10;
const BATCH_DELAY_MS = 21_000;
const MAX_RETRIES = 5;
const RETRY_BASE_DELAY_MS = 30_000;

if (!process.env.VOYAGE_API_KEY) {
  process.stderr.write("VOYAGE_API_KEY is not set in .env\n");
  process.exit(1);
}

type Parable = { id: string; title: string; content: string; moral: string };

function buildEmbeddingText(parable: Parable): string {
  return `${parable.title}. ${parable.content} ${parable.moral}`;
}

async function saveBatch(parables: Parable[], embeddings: number[][]): Promise<void> {
  for (let i = 0; i < parables.length; i++) {
    const vector = embeddings[i];
    if (!vector.every(isFinite)) {
      throw new Error(`Invalid embedding values for parable ${parables[i].id}`);
    }
    const vectorStr = `[${vector.join(",")}]`;
    await prisma.$executeRaw`
      UPDATE "Parable" SET embedding = ${vectorStr}::vector WHERE id = ${parables[i].id}
    `;
  }
}

async function embedBatch(parables: Parable[], index: number, total: number): Promise<void> {
  process.stdout.write(`Batch ${index}: embedding ${parables.length} parables...\n`);
  const embeddings = await getEmbeddings(parables.map(buildEmbeddingText), "document");
  await saveBatch(parables, embeddings);
  process.stdout.write(`Progress: ${index * BATCH_SIZE}/${total}\n`);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRateLimitError(error: unknown): boolean {
  return error instanceof Error && error.message.includes('Voyage AI error 429');
}

// Voyage accounts without a payment method on file are capped at 3 RPM — the
// 21s inter-batch delay above assumes a clear rate-limit window, but a burst
// right before this script runs (e.g. seed-quote-embeddings.ts) can still
// leave the account rate-limited on the very first request. Retries with
// growing backoff (30s, 60s, 90s, ...) rather than failing the whole run.
async function embedBatchWithRetry(parables: Parable[], index: number, total: number): Promise<void> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await embedBatch(parables, index, total);
      return;
    } catch (error) {
      if (!isRateLimitError(error) || attempt === MAX_RETRIES) throw error;
      const delay = RETRY_BASE_DELAY_MS * attempt;
      process.stdout.write(`Rate limited on batch ${index} (attempt ${attempt}/${MAX_RETRIES}) — retrying in ${delay / 1000}s...\n`);
      await sleep(delay);
    }
  }
}

async function main() {
  const parables = await prisma.parable.findMany({
    select: { id: true, title: true, content: true, moral: true },
  });

  process.stdout.write(`Found ${parables.length} parables\n`);

  for (let i = 0; i < parables.length; i += BATCH_SIZE) {
    if (i > 0) await sleep(BATCH_DELAY_MS);
    await embedBatchWithRetry(parables.slice(i, i + BATCH_SIZE), Math.floor(i / BATCH_SIZE) + 1, parables.length);
  }

  const result = await prisma.$queryRaw<{ count: bigint }[]>`
    SELECT COUNT(*) as count FROM "Parable" WHERE embedding IS NOT NULL
  `;
  process.stdout.write(`Done! ${result[0].count}/${parables.length} parables have embeddings\n`);
}

main()
  .catch((err) => process.stderr.write(`${err}\n`))
  .finally(() => prisma.$disconnect());
