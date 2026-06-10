import * as dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const VOYAGE_API_KEY = process.env.VOYAGE_API_KEY;
const MODEL = "voyage-3";
const BATCH_SIZE = 50;

if (!VOYAGE_API_KEY) {
  console.error("VOYAGE_API_KEY is not set in .env");
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
    const vectorStr = `[${embeddings[i].join(",")}]`;
    await prisma.$executeRaw`
      UPDATE "Parable" SET embedding = ${vectorStr}::vector WHERE id = ${parables[i].id}
    `;
  }
}

async function embedBatch(parables: Parable[], index: number, total: number): Promise<void> {
  console.log(`Batch ${index}: embedding ${parables.length} parables...`);
  const embeddings = await fetchEmbeddings(parables.map(buildEmbeddingText));
  await saveBatch(parables, embeddings);
  console.log(`Progress: ${index * BATCH_SIZE}/${total}`);
}

async function main() {
  const parables = await prisma.parable.findMany({
    select: { id: true, title: true, content: true, moral: true },
  });

  console.log(`Found ${parables.length} parables`);

  for (let i = 0; i < parables.length; i += BATCH_SIZE) {
    await embedBatch(parables.slice(i, i + BATCH_SIZE), Math.floor(i / BATCH_SIZE) + 1, parables.length);
  }

  const result = await prisma.$queryRaw<{ count: bigint }[]>`
    SELECT COUNT(*) as count FROM "Parable" WHERE embedding IS NOT NULL
  `;
  console.log(`Done! ${result[0].count}/${parables.length} parables have embeddings`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
