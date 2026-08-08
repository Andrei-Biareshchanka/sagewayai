import * as dotenv from 'dotenv';
dotenv.config();

import * as fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { getEmbeddings } from '../src/lib/voyage';

const adapter = new PrismaPg({ connectionString: process.env['DATABASE_URL'] });
const prisma = new PrismaClient({ adapter });

type Candidate = { title: string; content: string; moral: string };

function buildEmbeddingText(p: Candidate): string {
  return `${p.title}. ${p.content} ${p.moral}`;
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
    process.stderr.write('Usage: tsx scripts/check-new-parable-similarity.ts <candidates.json>\n');
    process.exit(1);
  }

  const candidates: Candidate[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const embeddings = await getEmbeddings(candidates.map(buildEmbeddingText), 'document');

  let anyFlagged = false;

  for (let i = 0; i < candidates.length; i++) {
    const vectorStr = `[${embeddings[i]!.join(',')}]`;

    const dbMatches = await prisma.$queryRaw<{ title: string; similarity: number }[]>`
      SELECT title, CAST(1 - (embedding <=> ${vectorStr}::vector) AS float8) AS similarity
      FROM "Parable"
      WHERE embedding IS NOT NULL
      ORDER BY embedding <=> ${vectorStr}::vector
      LIMIT 3
    `;

    const batchMatches: { title: string; similarity: number }[] = [];
    for (let j = 0; j < candidates.length; j++) {
      if (j === i) continue;
      const sim = cosineSimilarity(embeddings[i]!, embeddings[j]!);
      batchMatches.push({ title: candidates[j]!.title, similarity: sim });
    }
    batchMatches.sort((a, b) => b.similarity - a.similarity);

    const topDb = dbMatches[0];
    const topBatch = batchMatches[0];
    const flagged = (topDb && topDb.similarity >= 0.85) || (topBatch && topBatch.similarity >= 0.85);
    if (flagged) anyFlagged = true;

    process.stdout.write(`\n"${candidates[i]!.title}"${flagged ? '  [FLAGGED]' : ''}\n`);
    process.stdout.write(`  vs DB:    ${dbMatches.map((m) => `${m.title} (${m.similarity.toFixed(3)})`).join(', ')}\n`);
    if (topBatch) {
      process.stdout.write(`  vs batch: ${topBatch.title} (${topBatch.similarity.toFixed(3)})\n`);
    }
  }

  process.stdout.write(anyFlagged ? '\nRESULT: at least one candidate flagged for review.\n' : '\nRESULT: no duplicates detected.\n');
}

main().catch(console.error).finally(() => prisma.$disconnect());
