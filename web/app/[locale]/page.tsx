import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { SITE_URL } from '@/lib/config';
import { HomeDailyDigest } from '@/components/HomeDailyDigest';
import { CTABlock } from '@/components/CTABlock';
import { SituationCTA } from '@/components/SituationCTA';
import { TomorrowTeaser } from '@/components/TomorrowTeaser';
import { isLocale, type Locale } from '@/lib/locales';

export const revalidate = 3600;

type PageProps = { params: Promise<{ locale: string }> };

const HOME_METADATA: Record<Locale, { title: string; description: string; ogDescription: string }> = {
  ru: {
    title: 'SagewayAI — мудрость каждый день',
    description:
      'Дайджест дня: цитата, притча, рефлексия и вопрос для размышления. Найдите мудрость для вашей ситуации.',
    ogDescription: 'Дайджест дня: цитата, притча, рефлексия и вопрос для размышления.',
  },
  en: {
    title: 'SagewayAI — Daily Wisdom',
    description:
      'Daily digest: a quote, a parable, a reflection, and a question to sit with. Find wisdom for your situation.',
    ogDescription: 'Daily digest: a quote, a parable, a reflection, and a question to sit with.',
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale: Locale = isLocale(locale) ? locale : 'ru';
  const otherLocale: Locale = resolvedLocale === 'ru' ? 'en' : 'ru';
  const copy = HOME_METADATA[resolvedLocale];
  const url = `${SITE_URL}/${resolvedLocale}`;

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: url,
      languages: {
        [resolvedLocale]: url,
        [otherLocale]: `${SITE_URL}/${otherLocale}`,
        'x-default': `${SITE_URL}/ru`,
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.ogDescription,
      url,
      images: [
        {
          url: `/api/og?title=SagewayAI&lang=${resolvedLocale}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

function getDailyDigest() {
  return prisma.dailyDigest.findFirst({
    where: { isPublished: true },
    orderBy: { date: 'desc' },
    include: { quote: true, parable: { include: { category: true } } },
  });
}

// Returns the nearest unpublished draft. There is usually more than one in the
// queue — scripts/digest/prepare-future-digests.ts can fill a buffer days ahead
// of the publish-digest cron — so this orders by date rather than assuming a
// single row.
function getTomorrowDigest() {
  return prisma.dailyDigest.findFirst({
    where: { isPublished: false },
    orderBy: { date: 'asc' },
    select: {
      titleRu: true,
      titleEn: true,
      parable: { select: { title: true, titleRu: true } },
    },
  });
}

type DailyDigestWithRelations = NonNullable<Awaited<ReturnType<typeof getDailyDigest>>>;

// Most digests carry no image of their own while every REVIEWED parable does, so the
// daily block would otherwise render imageless on the majority of days. Falls back as a
// unit rather than field by field: pairing one source's image with the other's alt text
// would describe a picture that isn't on screen.
function pickDigestImage(digest: DailyDigestWithRelations) {
  if (digest.imageUrl) {
    return {
      imageUrl: digest.imageUrl,
      imageAltRu: digest.imageAltRu,
      imageAltEn: digest.imageAltEn,
    };
  }

  return {
    imageUrl: digest.parable.imageUrl,
    imageAltRu: digest.parable.imageAltRu,
    imageAltEn: digest.parable.imageAltEn,
  };
}

function buildWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SagewayAI',
    url: SITE_URL,
    description: 'Ежедневные дайджесты мудрости: притчи, цитаты философов, рефлексия и вопрос для размышления',
    inLanguage: ['ru', 'en'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const digest = await getDailyDigest();
  const tomorrow = await getTomorrowDigest();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebsiteJsonLd()) }}
      />
      <main className="flex-1 w-full max-w-[680px] mx-auto px-4 sm:px-6 py-12">
        {digest && (
          <div className="mb-12">
            <HomeDailyDigest
              data={{
                date: digest.date,
                ...pickDigestImage(digest),
                titleRu: digest.titleRu ?? digest.parable.titleRu ?? digest.parable.title,
                titleEn: digest.titleEn ?? digest.parable.title,
                quote: {
                  textRu: digest.quote.textRu ?? digest.quote.text,
                  authorRu: digest.quote.authorRu ?? digest.quote.author,
                  textEn: digest.quote.text,
                  authorEn: digest.quote.author,
                },
                parable: {
                  titleRu: digest.parable.titleRu ?? digest.parable.title,
                  contentRu: digest.parable.contentRu ?? digest.parable.content,
                  titleEn: digest.parable.title,
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
                parableCanonicalSlug:
                  digest.parable.reflectionStatus === 'REVIEWED'
                    ? (locale === 'ru' ? digest.parable.slugRu : digest.parable.slugEn)
                    : null,
              }}
            />
          </div>
        )}

        <div className="mb-12">
          <SituationCTA />
        </div>

        {tomorrow && (
          <div className="mb-6">
            <TomorrowTeaser
              tomorrow={{
                titleRu: tomorrow.titleRu ?? tomorrow.parable.titleRu ?? tomorrow.parable.title,
                titleEn: tomorrow.titleEn ?? tomorrow.parable.title,
              }}
            />
          </div>
        )}

        <CTABlock source="homepage_cta" />
      </main>
    </>
  );
}
