import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { generateSlug } from '@/lib/slug';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const digests = await prisma.dailyDigest.findMany({
    select: { date: true, parable: { select: { title: true } } },
    orderBy: { date: 'desc' },
  });

  return [
    {
      url: 'https://sagewayai.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...digests.map((d) => ({
      url: `https://sagewayai.com/d/${generateSlug(d.parable.title)}`,
      lastModified: d.date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
