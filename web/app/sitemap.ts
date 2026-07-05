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

  return [...homeEntries, ...digestsArchiveEntries, ...digestEntries];
}
