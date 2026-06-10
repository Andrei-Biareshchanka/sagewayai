import * as dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const VOYAGE_API_KEY = process.env.VOYAGE_API_KEY;
const MODEL = "voyage-3";
const BATCH_SIZE = 50;

if (!VOYAGE_API_KEY) {
  process.stderr.write("VOYAGE_API_KEY is not set in .env\n");
  process.exit(1);
}

type Parable = { id: string; title: string; content: string; moral: string };

function buildEmbeddingText(parable: Parable): string {
  return `${parable.title}. ${parable.content} ${parable.moral}`;
}

async function fetchEmbeddings(texts: string[]): Promise<number[][]> {
  const response = await fetch("https://api.voyageai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${VOYAGE_API_KEY}`,
    },
    body: JSON.stringify({ input: texts, model: MODEL, input_type: "document" }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Voyage AI API error ${response.status}: ${error}`);
  }

  const data = (await response.json()) as { data: { embedding: number[] }[] };
  return data.data.map((item) => item.embedding);
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
  const embeddings = await fetchEmbeddings(parables.map(buildEmbeddingText));
  await saveBatch(parables, embeddings);
  process.stdout.write(`Progress: ${index * BATCH_SIZE}/${total}\n`);
}

async function main() {
  const parables = await prisma.parable.findMany({
    select: { id: true, title: true, content: true, moral: true },
  });

  process.stdout.write(`Found ${parables.length} parables\n`);

  for (let i = 0; i < parables.length; i += BATCH_SIZE) {
    await embedBatch(parables.slice(i, i + BATCH_SIZE), Math.floor(i / BATCH_SIZE) + 1, parables.length);
  }

  const result = await prisma.$queryRaw<{ count: bigint }[]>`
    SELECT COUNT(*) as count FROM "Parable" WHERE embedding IS NOT NULL
  `;
  process.stdout.write(`Done! ${result[0].count}/${parables.length} parables have embeddings\n`);
}

main()
  .catch((err) => process.stderr.write(`${err}\n`))
  .finally(() => prisma.$disconnect());
