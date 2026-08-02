import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { SITE_URL } from '@/lib/config';
import { isLocale, type Locale } from '@/lib/locales';
import { pickLocalized } from '@/lib/locale-content';
import { t } from '@/lib/i18n';
import type { Lang } from '@/contexts/LanguageContext';
import { ParableCatalogContent } from './ParableCatalogContent';

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
};

async function getCategories() {
  return prisma.category.findMany({
    where: { parables: { some: { reflectionStatus: 'REVIEWED' } } },
    select: { name: true, nameRu: true, slug: true },
    orderBy: { name: 'asc' },
  });
}

async function getParables(categorySlug: string | undefined) {
  return prisma.parable.findMany({
    where: {
      reflectionStatus: 'REVIEWED',
      slugRu: { not: null },
      slugEn: { not: null },
      ...(categorySlug ? { category: { slug: categorySlug } } : {}),
    },
    select: {
      slugRu: true,
      slugEn: true,
      title: true,
      titleRu: true,
      imageUrl: true,
      imageAltRu: true,
      imageAltEn: true,
    },
    orderBy: { title: 'asc' },
  });
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'ru';
  const otherLocale: Locale = locale === 'ru' ? 'en' : 'ru';
  const { category: categorySlug } = await searchParams;

  const category = categorySlug
    ? await prisma.category.findUnique({ where: { slug: categorySlug }, select: { name: true, nameRu: true } })
    : null;

  const heading = t(locale as Lang, 'pritchaCatalogHeading');
  const title = category ? `${pickLocalized(category.nameRu, category.name, locale)} — ${heading}` : heading;
  const queryString = categorySlug ? `?category=${categorySlug}` : '';
  const canonical = `${SITE_URL}/${locale}/pritcha${queryString}`;

  return {
    title: `${title} | SagewayAI`,
    description: t(locale as Lang, 'pritchaCatalogIntro'),
    alternates: {
      canonical,
      languages: {
        [locale]: canonical,
        [otherLocale]: `${SITE_URL}/${otherLocale}/pritcha${queryString}`,
        'x-default': `${SITE_URL}/ru/pritcha${queryString}`,
      },
    },
  };
}

export default async function PritchaCatalogPage({ params, searchParams }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const { category: rawCategory } = await searchParams;
  const categories = await getCategories();
  const selectedCategory = categories.find((c) => c.slug === rawCategory);
  const parables = await getParables(selectedCategory?.slug);

  return (
    <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
      <ParableCatalogContent
        parables={parables.map((p) => ({
          slugRu: p.slugRu as string,
          slugEn: p.slugEn as string,
          title: p.title,
          titleRu: p.titleRu ?? p.title,
          imageUrl: p.imageUrl,
          imageAltRu: p.imageAltRu,
          imageAltEn: p.imageAltEn,
        }))}
        categories={categories}
        selectedCategorySlug={selectedCategory?.slug}
      />
    </main>
  );
}
