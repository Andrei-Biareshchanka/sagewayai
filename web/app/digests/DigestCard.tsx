'use client';

import { format } from 'date-fns';
import type { Locale } from 'date-fns';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export interface DigestCategorySummary {
  name: string;
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
      href={`/d/${digest.slug}`}
      className="block bg-white border border-[var(--color-border)] rounded-card p-4 hover:border-sage transition-colors space-y-2"
    >
      <span className="inline-block font-sans text-xs font-medium text-sage-dark bg-sage-pill rounded-full px-2 py-0.5">
        {digest.category.name}
      </span>
      <p className="font-serif text-base font-medium text-ink line-clamp-2">
        {lang === 'ru' ? digest.titleRu : digest.titleEn}
      </p>
      <p className="font-sans text-xs text-muted">
        {format(digest.date, 'd MMM yyyy', { locale: dateLocale })}
      </p>
    </Link>
  );
}
