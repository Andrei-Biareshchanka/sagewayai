import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env['DATABASE_URL']! });
const prisma = new PrismaClient({ adapter });

const QUOTES_PER_PARABLE = 3;

type QuoteMatch = { id: string; similarity: number };

async function findBestQuotes(parableId: string): Promise<QuoteMatch[]> {
  return prisma.$queryRaw<QuoteMatch[]>`
    SELECT q.id, CAST(1 - (q.embedding <=> p.embedding) AS float8) AS similarity
    FROM "Quote" q, "Parable" p
    WHERE p.id = ${parableId}
      AND q.embedding IS NOT NULL
      AND p.embedding IS NOT NULL
    ORDER BY q.embedding <=> p.embedding
    LIMIT ${QUOTES_PER_PARABLE}
  `;
}

async function recomputeParable(parableId: string, title: string): Promise<{ changed: boolean }> {
  const before = await prisma.parableQuote.findMany({
    where: { parableId },
    orderBy: { position: 'asc' },
    select: { quoteId: true },
  });
  const beforeIds = before.map((r) => r.quoteId);

  const matches = await findBestQuotes(parableId);
  if (matches.length < QUOTES_PER_PARABLE) {
    process.stdout.write(`  WARNING: "${title}" only found ${matches.length}/${QUOTES_PER_PARABLE} candidate quote(s).\n`);
  }
  const afterIds = matches.map((m) => m.id);

  const changed = beforeIds.length !== afterIds.length || beforeIds.some((id, i) => id !== afterIds[i]);
  if (!changed) return { changed: false };

  await prisma.$transaction([
    prisma.parableQuote.deleteMany({ where: { parableId } }),
    ...matches.map((match, i) =>
      prisma.parableQuote.create({
        data: { parableId, quoteId: match.id, position: i, isPrimary: i === 0 },
      }),
    ),
  ]);

  return { changed: true };
}

async function main() {
  const parables = await prisma.parable.findMany({
    select: { id: true, title: true },
    orderBy: { id: 'asc' },
  });

  process.stdout.write(`Recomputing quote assignments for ${parables.length} parable(s) against the full quote pool...\n`);

  let changedCount = 0;

  for (const parable of parables) {
    const { changed } = await recomputeParable(parable.id, parable.title);
    if (changed) {
      changedCount++;
      process.stdout.write(`  "${parable.title}" → reassigned\n`);
    }
  }

  process.stdout.write(`\nDone. ${changedCount}/${parables.length} parable(s) got new quote assignments.\n`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
