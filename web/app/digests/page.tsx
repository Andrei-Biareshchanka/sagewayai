import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DigestsArchiveContent } from './DigestsArchiveContent';

export const revalidate = 3600;

const PAGE_SIZE = 12;

type PageProps = { searchParams: Promise<{ page?: string }> };

function parsePage(raw: string | undefined): number {
  const page = Number(raw);
  return Number.isInteger(page) && page > 1 ? page : 1;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { page: rawPage } = await searchParams;
  const page = parsePage(rawPage);
  const canonical =
    page === 1 ? 'https://sagewayai.com/digests' : `https://sagewayai.com/digests?page=${page}`;

  return {
    title: 'Архив дайджестов | SagewayAI',
    description: 'Все дайджесты дня: цитаты, притчи и размышления из библиотеки SagewayAI.',
    alternates: { canonical },
    robots: page > 1 ? { index: false, follow: true } : undefined,
  };
}

async function getDigestsPage(page: number) {
  const [digests, total] = await Promise.all([
    prisma.dailyDigest.findMany({
      where: { slug: { not: null } },
      select: {
        date: true,
        slug: true,
        titleEn: true,
        titleRu: true,
        parable: { select: { title: true, titleRu: true } },
      },
      orderBy: { date: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.dailyDigest.count({ where: { slug: { not: null } } }),
  ]);
  return { digests, totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)) };
}

export default async function DigestsArchivePage({ searchParams }: PageProps) {
  const { page: rawPage } = await searchParams;
  const page = parsePage(rawPage);
  const { digests, totalPages } = await getDigestsPage(page);

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <DigestsArchiveContent
          digests={digests.map((d) => ({
            date: d.date,
            slug: d.slug as string,
            titleEn: d.titleEn ?? d.parable.title,
            titleRu: d.titleRu ?? d.parable.titleRu ?? d.parable.title,
          }))}
          page={page}
          totalPages={totalPages}
        />
      </main>
      <Footer />
    </>
  );
}
