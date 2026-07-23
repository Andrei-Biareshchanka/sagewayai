'use client';

import { format } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { SITE_URL } from '@/lib/config';
import { pickLocalized } from '@/lib/locale-content';
import { t } from '@/lib/i18n';
import { CTABlock } from '@/components/CTABlock';
import { DigestBlock } from '@/components/DigestBlock';
import { SituationCTA } from '@/components/SituationCTA';
import { useLocalizedDigest, type BilingualDigestContent } from '@/hooks/useLocalizedDigest';

interface BilingualDigest extends BilingualDigestContent {
  slug: string;
  date: Date;
  category: { name: string; nameRu: string | null; slug: string };
  parableCanonicalSlug: string | null;
}

interface RelatedDigest {
  date: Date;
  parableTitleRu: string;
  parableTitleEn: string;
  slug: string;
}

interface DigestPageContentProps {
  digest: BilingualDigest;
  related: RelatedDigest[];
}

export function DigestPageContent({ digest, related }: DigestPageContentProps) {
  const { lang } = useLanguage();
  const { title: digestTitle, imageAlt, data } = useLocalizedDigest(digest, lang);
  const dateLocale = lang === 'ru' ? ru : enUS;

  return (
    <div className="space-y-8">
      <nav className="font-sans text-sm text-muted flex items-center gap-1.5">
        <Link href={`/${lang}`} className="hover:text-ink transition-colors">
          {t(lang, 'navHome')}
        </Link>
        <span>/</span>
        <span>{t(lang, 'navDigestOfDay')}</span>
      </nav>

      <DigestBlock
        title={digestTitle}
        data={data}
        date={digest.date}
        category={digest.category}
        imageUrl={digest.imageUrl ?? undefined}
        imageAlt={imageAlt}
        shareUrl={`${SITE_URL}/${lang}/d/${digest.slug}?utm_source=share&utm_medium=social`}
        shareTitle={digestTitle}
        parableCanonicalSlug={digest.parableCanonicalSlug}
      />

      <SituationCTA />

      {related.length > 0 && (
        <section className="mt-12 space-y-4">
          <h2 className="font-serif text-xl font-semibold text-ink">
            {t(lang, 'otherDigests')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/${lang}/d/${item.slug}`}
                className="block bg-white border border-[var(--color-border)] rounded-card p-4 hover:border-sage transition-colors space-y-1"
              >
                <p className="font-serif text-sm font-medium text-ink line-clamp-2">
                  {pickLocalized(item.parableTitleRu, item.parableTitleEn, lang)}
                </p>
                <p className="font-sans text-xs text-muted">
                  {format(item.date, 'd MMM yyyy', { locale: dateLocale })}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <CTABlock source="digest_cta" />
    </div>
  );
}
