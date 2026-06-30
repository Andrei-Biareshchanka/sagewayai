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

export async function findParableForQuote(quoteId: string): Promise<ParableMatch> {
  const usedParableIds = await prisma.dailyDigest
    .findMany({ where: { quoteId }, select: { parableId: true } })
    .then((rows) => rows.map((r) => r.parableId));

  const excludeClause = usedParableIds.length > 0
    ? Prisma.sql`AND p.id NOT IN (${Prisma.join(usedParableIds)})`
    : Prisma.empty;

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

  if (!match) {
    throw new Error(`No available parable found for quote ${quoteId}`);
  }

  return match;
}
