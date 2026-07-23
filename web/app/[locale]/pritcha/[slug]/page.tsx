import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { SITE_URL } from '@/lib/config';
import { isLocale, type Locale } from '@/lib/locales';
import { pickLocalized } from '@/lib/locale-content';
import { ParablePageContent } from './ParablePageContent';

export const revalidate = 86400;

// Only REVIEWED parables get a canonical URL — DRAFT/GENERATED/FAILED ones
// don't exist for the outside world yet (404, not a noindex stub with empty
// content). Same reasoning as DailyDigest's isPublished gate on /d/[slug].
export async function generateStaticParams() {
  const parables = await prisma.parable.findMany({
    where: { reflectionStatus: 'REVIEWED', slugRu: { not: null }, slugEn: { not: null } },
    select: { slugRu: true, slugEn: true },
  });

  // slugRu and slugEn differ per parable (unlike DailyDigest's single shared
  // slug), so each locale needs its own (locale, slug) pair — not a flat
  // LOCALES × slugs cross-join.
  return parables.flatMap((p) => [
    { locale: 'ru', slug: p.slugRu as string },
    { locale: 'en', slug: p.slugEn as string },
  ]);
}

async function getParableBySlug(locale: Locale, slug: string) {
  return prisma.parable.findFirst({
    where: {
      reflectionStatus: 'REVIEWED',
      ...(locale === 'ru' ? { slugRu: slug } : { slugEn: slug }),
    },
    include: {
      category: true,
      quotes: { include: { quote: true }, orderBy: { position: 'asc' } },
    },
  });
}

// Flat-taxonomy "similar parables" — same Category, also REVIEWED (an
// unreviewed related parable would link to a page that 404s). Situation-based
// hubs are a separate, later feature — this is deliberately simple.
async function getRelatedParables(parableId: string, categoryId: string) {
  return prisma.parable.findMany({
    where: {
      id: { not: parableId },
      categoryId,
      reflectionStatus: 'REVIEWED',
      slugRu: { not: null },
      slugEn: { not: null },
    },
    select: { titleRu: true, title: true, slugRu: true, slugEn: true },
    take: 5,
  });
}

type PageProps = { params: Promise<{ locale: string; slug: string }> };
type ParableWithCategory = NonNullable<Awaited<ReturnType<typeof getParableBySlug>>>;

function siblingSlug(parable: ParableWithCategory, otherLocale: Locale): string {
  return otherLocale === 'ru' ? (parable.slugRu as string) : (parable.slugEn as string);
}

function buildOgImageUrl(parable: ParableWithCategory, title: string, locale: Locale): string {
  const primaryQuote = parable.quotes.find((pq) => pq.isPrimary) ?? parable.quotes[0];
  const quote = primaryQuote
    ? pickLocalized(primaryQuote.quote.textRu, primaryQuote.quote.text, locale).slice(0, 200)
    : '';
  const author = primaryQuote
    ? pickLocalized(primaryQuote.quote.authorRu, primaryQuote.quote.author, locale)
    : '';
  const params = new URLSearchParams({ title, quote, author, lang: locale });
  return `${SITE_URL}/api/og?${params.toString()}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'ru';
  const otherLocale: Locale = locale === 'ru' ? 'en' : 'ru';

  const parable = await getParableBySlug(locale, slug);
  if (!parable) return {};

  const title = pickLocalized(parable.titleRu, parable.title, locale);
  const moral = pickLocalized(parable.moralRu, parable.moral, locale);
  const description = moral.slice(0, 160);
  const canonical = `${SITE_URL}/${locale}/pritcha/${slug}`;
  const canonicalRu = `${SITE_URL}/ru/pritcha/${parable.slugRu}`;
  const canonicalOther = `${SITE_URL}/${otherLocale}/pritcha/${siblingSlug(parable, otherLocale)}`;
  const ogImageUrl = parable.imageUrl ?? buildOgImageUrl(parable, title, locale);
  const ogImage = parable.imageUrl ? { url: ogImageUrl } : { url: ogImageUrl, width: 1200, height: 630 };

  return {
    title: `${title} | SagewayAI`,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: [ogImage],
    },
    twitter: {
      images: [ogImageUrl],
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

export default async function ParablePage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;

  const parable = await getParableBySlug(locale, slug);
  if (!parable) notFound();

  const related = await getRelatedParables(parable.id, parable.categoryId);

  const title = pickLocalized(parable.titleRu, parable.title, locale);
  const description = pickLocalized(parable.moralRu, parable.moral, locale).slice(0, 160);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    headline: title,
    description,
    dateModified: parable.updatedAt.toISOString(),
    dateCreated: parable.createdAt.toISOString(),
    author: {
      '@type': 'Organization',
      name: 'SagewayAI',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SagewayAI',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.svg`,
      },
    },
    image: parable.imageUrl ?? buildOgImageUrl(parable, title, locale),
    inLanguage: locale,
    isPartOf: {
      '@type': 'WebSite',
      name: 'SagewayAI',
      url: SITE_URL,
    },
    citation: parable.quotes.map((pq) => ({
      '@type': 'Quotation',
      text: pickLocalized(pq.quote.textRu, pq.quote.text, locale),
      creator: {
        '@type': 'Person',
        name: pickLocalized(pq.quote.authorRu, pq.quote.author, locale),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1 w-full max-w-[680px] mx-auto px-4 sm:px-6 py-12">
        <ParablePageContent
          parable={{
            titleRu: parable.titleRu ?? parable.title,
            titleEn: parable.title,
            contentRu: parable.contentRu ?? parable.content,
            contentEn: parable.content,
            imageUrl: parable.imageUrl,
            imageAltRu: parable.imageAltRu,
            imageAltEn: parable.imageAltEn,
            conclusionRu: parable.conclusionRu ?? '',
            conclusionEn: parable.conclusionEn ?? '',
            questionsRu: (parable.questionsRu as string[] | null) ?? [],
            questionsEn: (parable.questionsEn as string[] | null) ?? [],
            quotes: parable.quotes.map((pq) => ({
              textRu: pq.quote.textRu ?? pq.quote.text,
              textEn: pq.quote.text,
              authorRu: pq.quote.authorRu ?? pq.quote.author,
              authorEn: pq.quote.author,
              isPrimary: pq.isPrimary,
            })),
          }}
          related={related.map((p) => ({
            titleRu: p.titleRu ?? p.title,
            titleEn: p.title,
            slugRu: p.slugRu as string,
            slugEn: p.slugEn as string,
          }))}
        />
      </main>
    </>
  );
}

