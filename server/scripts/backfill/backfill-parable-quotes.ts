import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient, Prisma } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env['DATABASE_URL']! });
const prisma = new PrismaClient({ adapter });

const QUOTES_PER_PARABLE = 3;

type QuoteMatch = { id: string; similarity: number };

async function findMissingPositions(parableId: string): Promise<number[]> {
  const existing = await prisma.parableQuote.findMany({
    where: { parableId },
    select: { position: true },
  });
  const taken = new Set(existing.map((row) => row.position));
  const missing: number[] = [];
  for (let position = 0; position < QUOTES_PER_PARABLE; position++) {
    if (!taken.has(position)) missing.push(position);
  }
  return missing;
}

async function findNearestQuotes(
  parableId: string,
  excludeQuoteIds: string[],
  limit: number,
): Promise<QuoteMatch[]> {
  const excludeClause =
    excludeQuoteIds.length > 0 ? Prisma.sql`AND q.id NOT IN (${Prisma.join(excludeQuoteIds)})` : Prisma.empty;

  return prisma.$queryRaw<QuoteMatch[]>`
    SELECT q.id, CAST(1 - (q.embedding <=> p.embedding) AS float8) AS similarity
    FROM "Quote" q, "Parable" p
    WHERE p.id = ${parableId}
      AND q.embedding IS NOT NULL
      AND p.embedding IS NOT NULL
      ${excludeClause}
    ORDER BY q.embedding <=> p.embedding
    LIMIT ${limit}
  `;
}

async function backfillParable(parableId: string): Promise<number> {
  const missingPositions = await findMissingPositions(parableId);
  if (missingPositions.length === 0) return 0;

  const existingQuoteIds = (
    await prisma.parableQuote.findMany({ where: { parableId }, select: { quoteId: true } })
  ).map((row) => row.quoteId);

  const matches = await findNearestQuotes(parableId, existingQuoteIds, missingPositions.length);

  if (matches.length < missingPositions.length) {
    process.stdout.write(
      `  WARNING: parable ${parableId} only found ${matches.length}/${missingPositions.length} candidate quote(s) — quote pool may be too small.\n`,
    );
  }

  let assigned = 0;
  for (let i = 0; i < matches.length; i++) {
    const position = missingPositions[i]!;
    await prisma.parableQuote.create({
      data: {
        parableId,
        quoteId: matches[i]!.id,
        position,
        isPrimary: position === 0,
      },
    });
    assigned++;
  }
  return assigned;
}

async function main() {
  const parables = await prisma.parable.findMany({
    select: { id: true, title: true },
    orderBy: { id: 'asc' },
  });

  process.stdout.write(`Checking ${parables.length} parable(s)...\n`);

  let touchedParables = 0;
  let totalAssigned = 0;

  for (const parable of parables) {
    const assigned = await backfillParable(parable.id);
    if (assigned > 0) {
      touchedParables++;
      totalAssigned += assigned;
      process.stdout.write(`  "${parable.title}" → assigned ${assigned} quote(s)\n`);
    }
  }

  process.stdout.write(`\nDone. Touched ${touchedParables} parable(s), assigned ${totalAssigned} ParableQuote row(s) total.\n`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
