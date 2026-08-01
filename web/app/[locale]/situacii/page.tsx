import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { SITE_URL } from '@/lib/config';
import { isLocale, type Locale } from '@/lib/locales';
import { pickLocalized } from '@/lib/locale-content';
import { t } from '@/lib/i18n';
import type { Lang } from '@/contexts/LanguageContext';

export const revalidate = 3600;

type PageProps = { params: Promise<{ locale: string }> };

async function getPublishedSituations(locale: Locale) {
  const situations = await prisma.situation.findMany({
    where: { isPublished: true },
    select: {
      slugRu: true,
      slugEn: true,
      h1Ru: true,
      h1En: true,
      metaDescriptionRu: true,
      metaDescriptionEn: true,
    },
    orderBy: { createdAt: 'asc' },
  });

  return situations.map((s) => ({
    slug: locale === 'ru' ? s.slugRu : s.slugEn,
    title: pickLocalized(s.h1Ru, s.h1En, locale),
    description: pickLocalized(s.metaDescriptionRu, s.metaDescriptionEn, locale),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'ru';
  const otherLocale: Locale = locale === 'ru' ? 'en' : 'ru';
  const canonical = `${SITE_URL}/${locale}/situacii`;

  return {
    title: `${t(locale as Lang, 'situaciiIndexHeading')} | SagewayAI`,
    description: t(locale as Lang, 'situaciiIndexIntro'),
    alternates: {
      canonical,
      languages: {
        [locale]: canonical,
        [otherLocale]: `${SITE_URL}/${otherLocale}/situacii`,
        'x-default': `${SITE_URL}/ru/situacii`,
      },
    },
  };
}

export default async function SituaciiIndexPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'ru';
  const situations = await getPublishedSituations(locale);

  return (
    <main className="flex-1 w-full max-w-[680px] mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="space-y-3">
        <h1 className="font-serif text-2xl md:text-3xl font-semibold text-ink">
          {t(locale as Lang, 'situaciiIndexHeading')}
        </h1>
        <p className="font-sans text-base text-muted">{t(locale as Lang, 'situaciiIndexIntro')}</p>
      </div>

      <div className="space-y-4">
        {situations.map((s) => (
          <Link
            key={s.slug}
            href={`/${locale}/situacii/${s.slug}`}
            className="block bg-white border border-[var(--color-border)] rounded-card p-4 md:p-5 hover:border-sage transition-colors"
          >
            <p className="font-serif text-lg font-medium text-ink">{s.title}</p>
            <p className="font-sans text-sm text-muted mt-1">{s.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
