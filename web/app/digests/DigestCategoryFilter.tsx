'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import type { DigestCategorySummary } from './DigestCard';

interface DigestCategoryFilterProps {
  categories: DigestCategorySummary[];
  selectedCategorySlug: string | undefined;
}

function pillHref(slug: string | undefined): string {
  return slug ? `/digests?category=${slug}` : '/digests';
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
        href={pillHref(undefined)}
        className={`font-sans text-sm font-medium rounded-full px-3 py-1 transition-colors ${pillClassName(!selectedCategorySlug)}`}
      >
        {lang === 'ru' ? 'Все' : 'All'}
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={pillHref(category.slug)}
          className={`font-sans text-sm font-medium rounded-full px-3 py-1 transition-colors ${pillClassName(selectedCategorySlug === category.slug)}`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
