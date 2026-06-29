import { PrismaClient } from '@prisma/client';

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function buildDigestSlug(
  prisma: PrismaClient,
  parableTitle: string,
  author: string,
  theme: string | null,
): Promise<string> {
  const base = theme
    ? `${toSlug(parableTitle)}-${toSlug(author)}-${toSlug(theme)}`
    : `${toSlug(parableTitle)}-${toSlug(author)}`;

  const existing = await prisma.dailyDigest.findUnique({ where: { slug: base } });
  if (!existing) return base;

  let counter = 2;
  while (true) {
    const candidate = `${base}-${counter}`;
    const conflict = await prisma.dailyDigest.findUnique({ where: { slug: candidate } });
    if (!conflict) return candidate;
    counter++;
  }
}
