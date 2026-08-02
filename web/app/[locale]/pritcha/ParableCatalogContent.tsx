'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import { ParableCatalogCard, type ParableCatalogSummary } from './ParableCatalogCard';
import { ParableCategoryFilter, type ParableCategorySummary } from './ParableCategoryFilter';

interface ParableCatalogContentProps {
  parables: ParableCatalogSummary[];
  categories: ParableCategorySummary[];
  selectedCategorySlug: string | undefined;
}

export function ParableCatalogContent({
  parables,
  categories,
  selectedCategorySlug,
}: ParableCatalogContentProps) {
  const { lang } = useLanguage();

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="font-serif text-2xl md:text-3xl font-semibold text-ink">
          {t(lang, 'pritchaCatalogHeading')}
        </h1>
        <p className="font-sans text-base text-muted">{t(lang, 'pritchaCatalogIntro')}</p>
      </div>

      <ParableCategoryFilter categories={categories} selectedCategorySlug={selectedCategorySlug} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {parables.map((parable) => (
          <ParableCatalogCard key={parable.slugRu} parable={parable} />
        ))}
      </div>
    </div>
  );
}
