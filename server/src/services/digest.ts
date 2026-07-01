import { Prisma } from '@prisma/client';
import { prisma } from "../lib/prisma";

type ParableMatch = {
  id: string;
  title: string;
  content: string;
  moral: string;
  source: string | null;
  readTime: number;
  categoryId: string;
  similarity: number;
};

// A parable stays "on cooldown" (ineligible for a new pairing) for this many days after
// its last use, so the same parable doesn't reappear every day or two with a new quote.
const PARABLE_COOLDOWN_DAYS = 14;

async function getPairedParableIds(quoteId: string): Promise<string[]> {
  const rows = await prisma.dailyDigest.findMany({ where: { quoteId }, select: { parableId: true } });
  return rows.map((r) => r.parableId);
}

async function getRecentlyUsedParableIds(cooldownDays: number): Promise<string[]> {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - cooldownDays);
  const rows = await prisma.dailyDigest.findMany({
    where: { date: { gte: cutoff } },
    select: { parableId: true },
  });
  return rows.map((r) => r.parableId);
}

function buildExcludeClause(parableIds: string[]): Prisma.Sql {
  return parableIds.length > 0 ? Prisma.sql`AND p.id NOT IN (${Prisma.join(parableIds)})` : Prisma.empty;
}

async function queryBestMatch(quoteId: string, excludeClause: Prisma.Sql): Promise<ParableMatch | undefined> {
  const [match] = await prisma.$queryRaw<ParableMatch[]>`
    SELECT p.id, p.title, p.content, p.moral, p.source, p."readTime", p."categoryId",
           CAST(1 - (p.embedding <=> q.embedding) AS float8) AS similarity
    FROM "Parable" p, "Quote" q
    WHERE q.id = ${quoteId}
      AND p.embedding IS NOT NULL
      AND q.embedding IS NOT NULL
      ${excludeClause}
    ORDER BY p.embedding <=> q.embedding
    LIMIT 1
  `;
  return match;
}

export async function findParableForQuote(quoteId: string): Promise<ParableMatch> {
  const pairedParableIds = await getPairedParableIds(quoteId);
  const recentParableIds = await getRecentlyUsedParableIds(PARABLE_COOLDOWN_DAYS);
  const cooldownExcludeIds = Array.from(new Set([...pairedParableIds, ...recentParableIds]));

  const match =
    (await queryBestMatch(quoteId, buildExcludeClause(cooldownExcludeIds))) ??
    (await queryBestMatch(quoteId, buildExcludeClause(pairedParableIds)));

  if (!match) {
    throw new Error(`No available parable found for quote ${quoteId}`);
  }

  return match;
}
