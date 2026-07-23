import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env['DATABASE_URL']! });
const prisma = new PrismaClient({ adapter });

const FALLBACK_PREFIX = 'pritcha';

// Standard practical Cyrillic-to-Latin table (lowercase only — input is
// lowercased before this runs). ъ/ь have no Latin sound of their own and are
// dropped rather than mapped, same as most web-slug transliteration schemes.
const CYRILLIC_TO_LATIN: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i',
  й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't',
  у: 'u', ф: 'f', х: 'h', ц: 'c', ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y',
  ь: '', э: 'e', ю: 'yu', я: 'ya',
};

function transliterate(text: string): string {
  return text
    .toLowerCase()
    .split('')
    .map((char) => CYRILLIC_TO_LATIN[char] ?? char)
    .join('');
}

// Shared by both slugRu and slugEn: transliteration (for RU) only maps
// Cyrillic letters to Latin ones — everything else (quotes, dashes, em-dashes,
// punctuation) still needs collapsing into single hyphens here, or a title
// like `«Лёгкие деньги» — тяжкий путь` would leave stray/doubled hyphens.
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildRuSlugBase(titleRu: string | null, parableId: string): string {
  const trimmed = titleRu?.trim();
  if (!trimmed) return `${FALLBACK_PREFIX}-${parableId.slice(-8)}`;
  const slug = slugify(transliterate(trimmed));
  return slug || `${FALLBACK_PREFIX}-${parableId.slice(-8)}`;
}

function buildEnSlugBase(titleEn: string, parableId: string): string {
  const trimmed = titleEn.trim();
  if (!trimmed) return `${FALLBACK_PREFIX}-${parableId.slice(-8)}`;
  const slug = slugify(trimmed);
  return slug || `${FALLBACK_PREFIX}-${parableId.slice(-8)}`;
}

// Deterministic collision handling: tracks every slug already taken (existing
// rows + ones assigned earlier in this same run) and appends -2, -3, ... only
// when the base is already taken. Rows that already have a slug are never
// touched, so re-running never renumbers a previously assigned suffix.
function resolveUniqueSlug(base: string, used: Set<string>): string {
  if (!used.has(base)) return base;
  let counter = 2;
  while (used.has(`${base}-${counter}`)) counter++;
  return `${base}-${counter}`;
}

async function loadUsedSlugs(field: 'slugRu' | 'slugEn'): Promise<Set<string>> {
  const rows = await prisma.parable.findMany({
    where: { [field]: { not: null } },
    select: { [field]: true },
  });
  return new Set(rows.map((r) => (r as Record<string, string>)[field]));
}

async function main() {
  const parables = await prisma.parable.findMany({
    where: { OR: [{ slugRu: null }, { slugEn: null }] },
    orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
    select: { id: true, title: true, titleRu: true, slugRu: true, slugEn: true },
  });

  console.log(`Found ${parables.length} parable(s) missing slugRu and/or slugEn.\n`);

  const usedRuSlugs = await loadUsedSlugs('slugRu');
  const usedEnSlugs = await loadUsedSlugs('slugEn');

  const examples: { title: string; slugRu: string; slugEn: string }[] = [];
  let updatedCount = 0;

  for (const parable of parables) {
    const data: { slugRu?: string; slugEn?: string } = {};

    if (!parable.slugRu) {
      const base = buildRuSlugBase(parable.titleRu, parable.id);
      const slug = resolveUniqueSlug(base, usedRuSlugs);
      usedRuSlugs.add(slug);
      data.slugRu = slug;
    }

    if (!parable.slugEn) {
      const base = buildEnSlugBase(parable.title, parable.id);
      const slug = resolveUniqueSlug(base, usedEnSlugs);
      usedEnSlugs.add(slug);
      data.slugEn = slug;
    }

    if (Object.keys(data).length === 0) continue;

    await prisma.parable.update({ where: { id: parable.id }, data });
    updatedCount++;

    if (examples.length < 5) {
      examples.push({
        title: parable.title,
        slugRu: data.slugRu ?? parable.slugRu!,
        slugEn: data.slugEn ?? parable.slugEn!,
      });
    }
  }

  console.log(`Backfilled ${updatedCount} parable(s).\n`);
  console.log('Examples:');
  for (const ex of examples) {
    console.log(`  "${ex.title}" → slugRu: ${ex.slugRu} | slugEn: ${ex.slugEn}`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
