import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { getEmbedding } from "../lib/voyage";

const DEFAULT_TOP_K = 5;

type ParableSearchResult = {
  id: string;
  title: string;
  content: string;
  moral: string;
  source: string | null;
  readTime: number;
  categoryId: string;
  similarity: number;
};

export async function searchParablesBySemantic(
  query: string,
  topK = DEFAULT_TOP_K
): Promise<ParableSearchResult[]> {
  const embedding = await getEmbedding(query, "query");

  if (!embedding.every(isFinite)) {
    throw new Error("Invalid embedding returned from Voyage AI");
  }

  const vectorStr = `[${embedding.join(",")}]`;
  const safeLimit = Prisma.raw(String(Math.floor(topK)));

  return prisma.$queryRaw<ParableSearchResult[]>`
    SELECT id, title, content, moral, source, "readTime", "categoryId",
           CAST(1 - (embedding <=> ${vectorStr}::public.vector) AS float8) AS similarity
    FROM "Parable"
    WHERE embedding IS NOT NULL
    ORDER BY embedding <=> ${vectorStr}::public.vector
    LIMIT ${safeLimit}
  `;
}
