import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { SITE_URL } from '@/lib/config';
import { LOCALES, type Locale } from '@/lib/locales';

export const revalidate = 86400;

function localeAlternates(buildPath: (locale: Locale) => string) {
  return {
    languages: Object.fromEntries(LOCALES.map((locale) => [locale, `${SITE_URL}${buildPath(locale)}`])),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const digests = await prisma.dailyDigest.findMany({
    select: { date: true, slug: true },
    where: { slug: { not: null }, isPublished: true },
    orderBy: { date: 'desc' },
  });

  const parables = await prisma.parable.findMany({
    select: { updatedAt: true, slugRu: true, slugEn: true },
    where: { reflectionStatus: 'REVIEWED', slugRu: { not: null }, slugEn: { not: null } },
    orderBy: { updatedAt: 'desc' },
  });

  const homeEntries = LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
    alternates: localeAlternates((l) => `/${l}`),
  }));

  const digestsArchiveEntries = LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}/digests`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.6,
    alternates: localeAlternates((l) => `/${l}/digests`),
  }));

  const digestEntries = digests.flatMap((d) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}/d/${d.slug}`,
      lastModified: d.date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: localeAlternates((l) => `/${l}/d/${d.slug}`),
    })),
  );

  // slugRu and slugEn differ per parable (unlike DailyDigest's single shared
  // slug), so each locale's URL and its alternates need their own per-locale
  // slug lookup rather than the flat localeAlternates helper.
  const parableSlugForLocale = (p: (typeof parables)[number], locale: Locale) =>
    locale === 'ru' ? (p.slugRu as string) : (p.slugEn as string);

  const parableEntries = parables.flatMap((p) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}/pritcha/${parableSlugForLocale(p, locale)}`,
      lastModified: p.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}/pritcha/${parableSlugForLocale(p, l)}`]),
        ),
      },
    })),
  );

  return [...homeEntries, ...digestsArchiveEntries, ...digestEntries, ...parableEntries];
}
