import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { SITE_URL } from '@/lib/config';
import { isLocale, type Locale } from '@/lib/locales';
import { pickLocalized } from '@/lib/locale-content';
import { SituationPageContent } from './SituationPageContent';

export const revalidate = 86400;

// Only published situations get a canonical URL — same reasoning as
// reflectionStatus REVIEWED gating /pritcha/[slug].
export async function generateStaticParams() {
  const situations = await prisma.situation.findMany({
    where: { isPublished: true },
    select: { slugRu: true, slugEn: true },
  });

  return situations.flatMap((s) => [
    { locale: 'ru', slug: s.slugRu },
    { locale: 'en', slug: s.slugEn },
  ]);
}

async function getSituationBySlug(locale: Locale, slug: string) {
  return prisma.situation.findFirst({
    where: {
      isPublished: true,
      ...(locale === 'ru' ? { slugRu: slug } : { slugEn: slug }),
    },
    include: {
      parables: {
        where: { parable: { reflectionStatus: 'REVIEWED' } },
        include: { parable: true },
        orderBy: { position: 'asc' },
      },
    },
  });
}

type PageProps = { params: Promise<{ locale: string; slug: string }> };
type SituationWithParables = NonNullable<Awaited<ReturnType<typeof getSituationBySlug>>>;

function siblingSlug(situation: SituationWithParables, otherLocale: Locale): string {
  return otherLocale === 'ru' ? situation.slugRu : situation.slugEn;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'ru';
  const otherLocale: Locale = locale === 'ru' ? 'en' : 'ru';

  const situation = await getSituationBySlug(locale, slug);
  if (!situation) return {};

  const title = pickLocalized(situation.h1Ru, situation.h1En, locale);
  const description = pickLocalized(situation.metaDescriptionRu, situation.metaDescriptionEn, locale);
  const canonical = `${SITE_URL}/${locale}/situacii/${slug}`;
  const canonicalRu = `${SITE_URL}/ru/situacii/${situation.slugRu}`;
  const canonicalOther = `${SITE_URL}/${otherLocale}/situacii/${siblingSlug(situation, otherLocale)}`;

  return {
    title: `${title} | SagewayAI`,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    alternates: {
      canonical,
      languages: {
        [locale]: canonical,
        [otherLocale]: canonicalOther,
        'x-default': canonicalRu,
      },
    },
  };
}

export default async function SituationPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;

  const situation = await getSituationBySlug(locale, slug);
  if (!situation) notFound();

  const title = pickLocalized(situation.h1Ru, situation.h1En, locale);
  const description = pickLocalized(situation.metaDescriptionRu, situation.metaDescriptionEn, locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    headline: title,
    description,
    dateModified: situation.updatedAt.toISOString(),
    dateCreated: situation.createdAt.toISOString(),
    inLanguage: locale,
    isPartOf: {
      '@type': 'WebSite',
      name: 'SagewayAI',
      url: SITE_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: situation.parables.map((sp, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/${locale}/pritcha/${
          locale === 'ru' ? sp.parable.slugRu : sp.parable.slugEn
        }`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1 w-full max-w-[680px] mx-auto px-4 sm:px-6 py-12">
        <SituationPageContent
          situation={{
            slugRu: situation.slugRu,
            slugEn: situation.slugEn,
            h1Ru: situation.h1Ru,
            h1En: situation.h1En,
            introRu: situation.introRu,
            introEn: situation.introEn,
            parables: situation.parables.map((sp) => ({
              slugRu: sp.parable.slugRu as string,
              slugEn: sp.parable.slugEn as string,
              titleRu: sp.parable.titleRu ?? sp.parable.title,
              titleEn: sp.parable.title,
              moralRu: sp.parable.moralRu ?? sp.parable.moral,
              moralEn: sp.parable.moral,
              imageUrl: sp.parable.imageUrl,
              imageAltRu: sp.parable.imageAltRu,
              imageAltEn: sp.parable.imageAltEn,
              noteRu: sp.noteRu,
              noteEn: sp.noteEn,
            })),
          }}
        />
      </main>
    </>
  );
}
