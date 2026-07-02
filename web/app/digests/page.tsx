import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { SITE_URL } from '@/lib/config';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DigestsArchiveContent } from './DigestsArchiveContent';

export const revalidate = 3600;

const PAGE_SIZE = 12;

const DIGEST_LIST_SELECT = {
  date: true,
  slug: true,
  titleEn: true,
  titleRu: true,
  parable: {
    select: {
      title: true,
      titleRu: true,
      category: { select: { name: true, nameRu: true, slug: true, color: true } },
    },
  },
} as const;

type PageProps = { searchParams: Promise<{ page?: string; category?: string }> };

function parsePage(raw: string | undefined): number {
  const page = Number(raw);
  return Number.isInteger(page) && page > 1 ? page : 1;
}

function buildCanonicalParams(page: number, categorySlug: string | undefined): string {
  const params = new URLSearchParams();
  if (categorySlug) params.set('category', categorySlug);
  if (page > 1) params.set('page', String(page));
  const query = params.toString();
  return query ? `?${query}` : '';
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { page: rawPage, category: categorySlug } = await searchParams;
  const page = parsePage(rawPage);
  const category = categorySlug
    ? await prisma.category.findUnique({
        where: { slug: categorySlug },
        select: { name: true, nameRu: true },
      })
    : null;

  const title = category
    ? `${category.nameRu ?? category.name} — Архив дайджестов | SagewayAI`
    : 'Архив дайджестов | SagewayAI';
  const canonical = `${SITE_URL}/digests${buildCanonicalParams(page, category ? categorySlug : undefined)}`;

  return {
    title,
    description: 'Все дайджесты дня: цитаты, притчи и размышления из библиотеки SagewayAI.',
    alternates: { canonical },
    robots: page > 1 ? { index: false, follow: true } : undefined,
  };
}

async function getCategories() {
  return prisma.category.findMany({
    where: { parables: { some: { digests: { some: { slug: { not: null } } } } } },
    select: { name: true, nameRu: true, slug: true, color: true },
    orderBy: { name: 'asc' },
  });
}

function buildDigestsWhere(categorySlug: string | undefined) {
  return {
    slug: { not: null },
    ...(categorySlug ? { parable: { category: { slug: categorySlug } } } : {}),
  };
}

async function getDigestsPage(page: number, categorySlug: string | undefined) {
  const where = buildDigestsWhere(categorySlug);
  const [digests, total] = await Promise.all([
    prisma.dailyDigest.findMany({
      where,
      select: DIGEST_LIST_SELECT,
      orderBy: { date: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.dailyDigest.count({ where }),
  ]);
  return { digests, totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)) };
}

function toDigestSummaries(digests: Awaited<ReturnType<typeof getDigestsPage>>['digests']) {
  return digests.map((d) => ({
    date: d.date,
    slug: d.slug as string,
    titleEn: d.titleEn ?? d.parable.title,
    titleRu: d.titleRu ?? d.parable.titleRu ?? d.parable.title,
    category: d.parable.category,
  }));
}

async function loadArchiveData(rawPage: string | undefined, rawCategory: string | undefined) {
  const page = parsePage(rawPage);
  const categories = await getCategories();
  const selectedCategory = categories.find((c) => c.slug === rawCategory);
  const { digests, totalPages } = await getDigestsPage(page, selectedCategory?.slug);
  return { page, categories, selectedCategorySlug: selectedCategory?.slug, digests, totalPages };
}

function ArchiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-[1200px] mx-auto px-4 sm:px-6 py-12">{children}</main>
      <Footer />
    </>
  );
}

export default async function DigestsArchivePage({ searchParams }: PageProps) {
  const { page: rawPage, category: rawCategory } = await searchParams;
  const data = await loadArchiveData(rawPage, rawCategory);

  return (
    <ArchiveLayout>
      <DigestsArchiveContent
        digests={toDigestSummaries(data.digests)}
        categories={data.categories}
        selectedCategorySlug={data.selectedCategorySlug}
        page={data.page}
        totalPages={data.totalPages}
      />
    </ArchiveLayout>
  );
}
