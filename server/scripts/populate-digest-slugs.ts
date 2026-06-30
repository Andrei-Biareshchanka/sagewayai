import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env['DATABASE_URL']! });
const prisma = new PrismaClient({ adapter });

export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function slugExists(slug: string, excludeDigestId: string): Promise<boolean> {
  const found = await prisma.dailyDigest.findUnique({ where: { slug } });
  return found !== null && found.id !== excludeDigestId;
}

export async function buildDigestSlug(
  parableTitle: string,
  author: string,
  theme: string | null,
  excludeDigestId: string,
): Promise<string> {
  const parableSlug = toSlug(parableTitle);
  const authorSlug = toSlug(author);
  const themeSlug = theme ? toSlug(theme) : null;

  // Always include theme when available: parable-author-theme
  const base = themeSlug
    ? `${parableSlug}-${authorSlug}-${themeSlug}`
    : `${parableSlug}-${authorSlug}`;

  if (!await slugExists(base, excludeDigestId)) return base;

  // Fallback: add counter if collision
  let counter = 2;
  while (true) {
    const candidate = `${base}-${counter}`;
    if (!await slugExists(candidate, excludeDigestId)) return candidate;
    counter++;
  }
}

async function main() {
  // Repopulate ALL digests (reset slugs to null first, then rebuild)
  const digests = await prisma.dailyDigest.findMany({
    include: { parable: true, quote: true },
    orderBy: { date: 'asc' },
  });

  console.log(`Repopulating slugs for ${digests.length} digests with format: parable-author-theme\n`);

  // Clear all slugs first (to avoid unique conflicts during re-generation)
  await prisma.dailyDigest.updateMany({ data: { slug: null } });

  for (const digest of digests) {
    const slug = await buildDigestSlug(
      digest.parable.title,
      digest.quote.author,
      digest.quote.theme ?? null,
      digest.id,
    );

    await prisma.dailyDigest.update({
      where: { id: digest.id },
      data: { slug },
    });

    console.log(`  [${digest.date.toISOString().slice(0, 10)}] "${digest.parable.title}" + "${digest.quote.author}" + theme:${digest.quote.theme ?? 'null'} → ${slug}`);
  }

  console.log('\nVerifying no duplicates...');
  const dupes = await prisma.$queryRaw<{ slug: string; count: bigint }[]>`
    SELECT slug, COUNT(*) as count FROM "DailyDigest"
    WHERE slug IS NOT NULL GROUP BY slug HAVING COUNT(*) > 1
  `;

  if (dupes.length === 0) {
    console.log('All slugs are unique.');
  } else {
    console.log('WARNING — duplicate slugs:', dupes);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
