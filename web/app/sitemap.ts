import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const digests = await prisma.dailyDigest.findMany({
    select: { date: true, slug: true },
    where: { slug: { not: null } },
    orderBy: { date: 'desc' },
  });

  return [
    {
      url: 'https://sagewayai.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://sagewayai.com/digests',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6,
    },
    ...digests.map((d) => ({
      url: `https://sagewayai.com/d/${d.slug}`,
      lastModified: d.date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
