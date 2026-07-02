import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { SITE_URL } from '@/lib/config';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const digests = await prisma.dailyDigest.findMany({
    select: { date: true, slug: true },
    where: { slug: { not: null } },
    orderBy: { date: 'desc' },
  });

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/digests`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6,
    },
    ...digests.map((d) => ({
      url: `${SITE_URL}/d/${d.slug}`,
      lastModified: d.date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
