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
// Tried in descending order — each step only relaxes the window when the stricter one
// has zero candidates, rather than jumping straight from 14 days to no cooldown at all
// (that silent all-or-nothing fallback previously let a parable resurface after just 4
// days when the 14-day pool happened to be exhausted). The array is fixed-length, so this
// can never loop indefinitely: it tries at most `PARABLE_COOLDOWN_STEPS.length` times.
const PARABLE_COOLDOWN_STEPS = [14, 10, 7, 3, 1, 0] as const;

async function getPairedParableIds(quoteId: string): Promise<string[]> {
  const rows = await prisma.dailyDigest.findMany({ where: { quoteId }, select: { parableId: true } });
  return rows.map((r) => r.parableId);
}

async function getRecentlyUsedParableIds(cooldownDays: number): Promise<string[]> {
  if (cooldownDays <= 0) return [];
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

  for (const cooldownDays of PARABLE_COOLDOWN_STEPS) {
    const recentParableIds = await getRecentlyUsedParableIds(cooldownDays);
    const excludeIds = Array.from(new Set([...pairedParableIds, ...recentParableIds]));
    const match = await queryBestMatch(quoteId, buildExcludeClause(excludeIds));
    if (match) return match;
  }

  // Reachable only if every parable is permanently paired with this exact quote already
  // (cooldownDays=0 above still excludes `pairedParableIds`) — a real data problem, not
  // a transient cooldown squeeze, so this should fail loudly rather than degrade further.
  throw new Error(`No available parable found for quote ${quoteId}`);
}
