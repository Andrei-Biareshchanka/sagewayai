'use client';

import { format } from 'date-fns';
import type { Locale } from 'date-fns';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLocalized } from '@/lib/locale-content';
import { t } from '@/lib/i18n';

export interface DigestCategorySummary {
  name: string;
  nameRu: string | null;
  slug: string;
  color: string | null;
}

export interface DigestSummary {
  date: Date;
  slug: string;
  titleEn: string;
  titleRu: string;
  category: DigestCategorySummary;
}

interface DigestCardProps {
  digest: DigestSummary;
  dateLocale: Locale;
}

export function DigestCard({ digest, dateLocale }: DigestCardProps) {
  const { lang } = useLanguage();

  return (
    <Link
      href={`/${lang}/d/${digest.slug}`}
      className="flex flex-col bg-white border border-[var(--color-border)] rounded-card p-4 hover:border-sage transition-colors space-y-2"
    >
      <p className="font-serif text-base font-medium text-ink line-clamp-2 min-h-[3rem]">
        {pickLocalized(digest.titleRu, digest.titleEn, lang)}
      </p>
      <p className="font-sans text-xs text-muted">
        {format(digest.date, 'd MMM yyyy', { locale: dateLocale })}
      </p>
      <span className="font-sans text-xs font-medium text-sage self-end mt-auto pt-1">
        {t(lang, 'readMore')}
      </span>
    </Link>
  );
}
