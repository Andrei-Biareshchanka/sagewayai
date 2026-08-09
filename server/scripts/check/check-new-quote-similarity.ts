import * as dotenv from 'dotenv';
dotenv.config();

import * as fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { getEmbeddings } from '../../src/lib/voyage';

const adapter = new PrismaPg({ connectionString: process.env['DATABASE_URL'] });
const prisma = new PrismaClient({ adapter });

type Candidate = { text: string; author: string };

function buildEmbeddingText(q: Candidate): string {
  return `${q.text} — ${q.author}`;
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i]! * b[i]!;
    normA += a[i]! * a[i]!;
    normB += b[i]! * b[i]!;
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    process.stderr.write('Usage: ts-node scripts/check/check-new-quote-similarity.ts <candidates.json>\n');
    process.exit(1);
  }

  const candidates: Candidate[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const embeddings = await getEmbeddings(candidates.map(buildEmbeddingText), 'document');

  let anyFlagged = false;

  for (let i = 0; i < candidates.length; i++) {
    const exactMatch = await prisma.quote.findFirst({
      where: { text: { equals: candidates[i]!.text, mode: 'insensitive' } },
    });

    const vectorStr = `[${embeddings[i]!.join(',')}]`;
    const dbMatches = await prisma.$queryRaw<{ text: string; author: string; similarity: number }[]>`
      SELECT text, author, CAST(1 - (embedding <=> ${vectorStr}::vector) AS float8) AS similarity
      FROM "Quote"
      WHERE embedding IS NOT NULL
      ORDER BY embedding <=> ${vectorStr}::vector
      LIMIT 3
    `;

    const batchMatches: { text: string; similarity: number }[] = [];
    for (let j = 0; j < candidates.length; j++) {
      if (j === i) continue;
      const sim = cosineSimilarity(embeddings[i]!, embeddings[j]!);
      batchMatches.push({ text: candidates[j]!.text, similarity: sim });
    }
    batchMatches.sort((a, b) => b.similarity - a.similarity);

    const topDb = dbMatches[0];
    const topBatch = batchMatches[0];
    const flagged = !!exactMatch || (topDb && topDb.similarity >= 0.9) || (topBatch && topBatch.similarity >= 0.9);
    if (flagged) anyFlagged = true;

    process.stdout.write(`\n"${candidates[i]!.text}" — ${candidates[i]!.author}${flagged ? '  [FLAGGED]' : ''}\n`);
    if (exactMatch) process.stdout.write(`  EXACT TEXT MATCH already in DB (author: ${exactMatch.author})\n`);
    process.stdout.write(`  vs DB:    ${dbMatches.map((m) => `"${m.text.slice(0, 40)}..." — ${m.author} (${m.similarity.toFixed(3)})`).join(', ')}\n`);
    if (topBatch) {
      process.stdout.write(`  vs batch: "${topBatch.text.slice(0, 40)}..." (${topBatch.similarity.toFixed(3)})\n`);
    }
  }

  process.stdout.write(anyFlagged ? '\nRESULT: at least one candidate flagged for review.\n' : '\nRESULT: no duplicates detected.\n');
}

main().catch(console.error).finally(() => prisma.$disconnect());
