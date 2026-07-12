'use client';

import Link from 'next/link';
import { useLanguage, type Lang } from '@/contexts/LanguageContext';
import { pickLocalized } from '@/lib/locale-content';
import { t } from '@/lib/i18n';
import type { DigestCategorySummary } from './DigestCard';

interface DigestCategoryFilterProps {
  categories: DigestCategorySummary[];
  selectedCategorySlug: string | undefined;
}

function pillHref(lang: Lang, slug: string | undefined): string {
  return slug ? `/${lang}/digests?category=${slug}` : `/${lang}/digests`;
}

function pillClassName(isActive: boolean): string {
  return isActive
    ? 'bg-sage text-white'
    : 'bg-sage-pill text-sage-dark hover:bg-sage-pill-hover';
}

export function DigestCategoryFilter({
  categories,
  selectedCategorySlug,
}: DigestCategoryFilterProps) {
  const { lang } = useLanguage();

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={pillHref(lang, undefined)}
        className={`font-sans text-sm font-medium rounded-full px-3 py-1 transition-colors ${pillClassName(!selectedCategorySlug)}`}
      >
        {t(lang, 'categoryAll')}
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={pillHref(lang, category.slug)}
          className={`font-sans text-sm font-medium rounded-full px-3 py-1 transition-colors ${pillClassName(selectedCategorySlug === category.slug)}`}
        >
          {pickLocalized(category.nameRu, category.name, lang)}
        </Link>
      ))}
    </div>
  );
}
