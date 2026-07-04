import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { SITE_URL } from '@/lib/config';
import { DigestPageContent } from './DigestPageContent';
import { LOCALES, isLocale, type Locale } from '@/lib/locales';
import { pickLocalized } from '@/lib/locale-content';

export const revalidate = 86400;

export async function generateStaticParams() {
  const digests = await prisma.dailyDigest.findMany({
    select: { slug: true },
    where: { slug: { not: null } },
    orderBy: { date: 'desc' },
  });
  return LOCALES.flatMap((locale) => digests.map((d) => ({ locale, slug: d.slug as string })));
}

async function getDigestBySlug(slug: string) {
  return prisma.dailyDigest.findUnique({
    where: { slug },
    include: {
      quote: true,
      parable: { include: { category: true } },
    },
  });
}

type PageProps = { params: Promise<{ locale: string; slug: string }> };
type DigestWithRelations = NonNullable<Awaited<ReturnType<typeof getDigestBySlug>>>;

function resolveDigestTitle(digest: DigestWithRelations, locale: Locale): string {
  return pickLocalized(
    digest.titleRu ?? digest.parable.titleRu ?? digest.parable.title,
    digest.titleEn ?? digest.parable.title,
    locale,
  );
}

function buildOgImageUrl(digest: DigestWithRelations, title: string, locale: Locale): string {
  const quote = pickLocalized(digest.quote.textRu, digest.quote.text, locale).slice(0, 200);
  const author = pickLocalized(digest.quote.authorRu, digest.quote.author, locale);
  const params = new URLSearchParams({ title, quote, author, lang: locale });
  return `${SITE_URL}/api/og?${params.toString()}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'ru';
  const otherLocale: Locale = locale === 'ru' ? 'en' : 'ru';
  const digest = await getDigestBySlug(slug);
  if (!digest) return {};

  const title = resolveDigestTitle(digest, locale);
  const quoteSnippet = pickLocalized(digest.quote.textRu, digest.quote.text, locale).slice(0, 80);
  const moral = pickLocalized(digest.parable.moralRu, digest.parable.moral, locale);
  const description = `«${quoteSnippet}» — ${moral}`.slice(0, 160);
  const ogImageUrl = buildOgImageUrl(digest, title, locale);
  const canonical = `${SITE_URL}/${locale}/d/${slug}`;

  return {
    title: `${title} | SagewayAI`,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: digest.date.toISOString(),
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      images: [ogImageUrl],
    },
    alternates: {
      canonical,
      languages: {
        [locale]: canonical,
        [otherLocale]: `${SITE_URL}/${otherLocale}/d/${slug}`,
        'x-default': `${SITE_URL}/ru/d/${slug}`,
      },
    },
  };
}

export default async function DigestPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;

  const digest = await getDigestBySlug(slug);
  if (!digest) notFound();

  const related = await prisma.dailyDigest.findMany({
    where: { slug: { not: slug } },
    select: {
      date: true,
      slug: true,
      parable: { select: { title: true, titleRu: true } },
    },
    orderBy: { date: 'desc' },
    take: 3,
  });

  const description = pickLocalized(digest.parable.contentRu, digest.parable.content, locale).slice(0, 160);
  const title = resolveDigestTitle(digest, locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: digest.date.toISOString(),
    dateModified: digest.createdAt.toISOString(),
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
    image: buildOgImageUrl(digest, title, locale),
    inLanguage: locale,
    isPartOf: {
      '@type': 'WebSite',
      name: 'SagewayAI',
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1 max-w-[680px] mx-auto px-4 sm:px-6 py-12">
        <DigestPageContent
          digest={{
            slug,
            date: digest.date,
            titleRu: digest.titleRu ?? digest.parable.titleRu ?? digest.parable.title,
            titleEn: digest.titleEn ?? digest.parable.title,
            quote: {
              textRu: digest.quote.textRu ?? digest.quote.text,
              textEn: digest.quote.text,
              authorRu: digest.quote.authorRu ?? digest.quote.author,
              authorEn: digest.quote.author,
            },
            parable: {
              titleRu: digest.parable.titleRu ?? digest.parable.title,
              titleEn: digest.parable.title,
              contentRu: digest.parable.contentRu ?? digest.parable.content,
              contentEn: digest.parable.content,
            },
            conclusionRu: digest.conclusionRu,
            conclusionEn: digest.conclusionEn,
            questionRu: digest.questionRu,
            questionEn: digest.questionEn,
            category: {
              name: digest.parable.category.name,
              nameRu: digest.parable.category.nameRu,
              slug: digest.parable.category.slug,
            },
          }}
          related={related.map((d) => ({
            date: d.date,
            parableTitleRu: d.parable.titleRu ?? d.parable.title,
            parableTitleEn: d.parable.title,
            slug: d.slug as string,
          }))}
        />
      </main>
    </>
  );
}
