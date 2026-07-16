import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { SITE_URL } from '@/lib/config';
import { isLocale, type Locale } from '@/lib/locales';
import { SituationSearch } from '@/components/SituationSearch';

export const revalidate = 3600;

type PageProps = { params: Promise<{ locale: string }> };

const SEARCH_METADATA: Record<Locale, { heading: string; description: string; heroAlt: string }> = {
  ru: {
    heading: 'Поиск мудрости под вашу ситуацию',
    description: 'Опишите ситуацию своими словами и получите притчу и цитату, близкие к тому, что вы переживаете.',
    heroAlt: 'Мужчина и женщина сидят рядом на земле в туманном лесу и читают светящуюся раскрытую книгу.',
  },
  en: {
    heading: 'Wisdom search for your situation',
    description: 'Describe your situation in your own words and get a parable and quote that speak to it.',
    heroAlt: 'A man and a woman sit together on the ground in a misty forest, reading a glowing open book.',
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'ru';
  const otherLocale: Locale = locale === 'ru' ? 'en' : 'ru';
  const copy = SEARCH_METADATA[locale];
  const canonical = `${SITE_URL}/${locale}/search`;

  return {
    title: `${copy.heading} | SagewayAI`,
    description: copy.description,
    alternates: {
      canonical,
      languages: {
        [locale]: canonical,
        [otherLocale]: `${SITE_URL}/${otherLocale}/search`,
        'x-default': `${SITE_URL}/ru/search`,
      },
    },
  };
}

export default async function SearchPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  return (
    <main className="flex-1 w-full max-w-[680px] mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-2xl md:text-3xl font-semibold text-ink mb-6">
        {SEARCH_METADATA[locale].heading}
      </h1>

      <div className="mb-6 rounded-2xl overflow-hidden">
        <Image
          src="/images/search-hero.png"
          alt={SEARCH_METADATA[locale].heroAlt}
          width={1376}
          height={768}
          priority
          className="w-full h-auto object-cover"
        />
      </div>
      <SituationSearch />
    </main>
  );
}
