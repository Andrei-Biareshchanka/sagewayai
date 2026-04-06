import { useMemo, useState } from 'react';

import { useCategories } from '@/categories/useCategories';
import { useDailyParable, useParables } from '@/parables/useParables';
import { DailyParableCard } from './FeaturedStoryCard';
import { HeroSection } from './HeroSection';
import { ParableCard } from './StoryMiniCard';

function HomePage() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const { data: daily, isLoading: dailyLoading } = useDailyParable();
  const { data: parablesData, isLoading: parablesLoading } = useParables({ limit: 3 });
  const { data: categories } = useCategories();

  const categoryMap = useMemo(
    () => Object.fromEntries((categories ?? []).map((c) => [c.id, c.name])),
    [categories],
  );

  if (dailyLoading || parablesLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-[#6B7280]">
        Loading...
      </div>
    );
  }

  return (
    <main>
      <HeroSection
        categories={categories ?? []}
        activeSlug={activeSlug}
        onCategoryChange={setActiveSlug}
      />

      {daily && (
        <DailyParableCard
          parable={daily}
          categoryName={categoryMap[daily.categoryId] ?? ''}
        />
      )}

      <section className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-6 sm:pb-20">
        <h2 className="mb-6 font-serif text-2xl font-semibold text-[#1A1A1A]">More parables</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(parablesData?.data ?? []).map((parable) => (
            <ParableCard
              key={parable.id}
              parable={parable}
              categoryName={categoryMap[parable.categoryId] ?? ''}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export { HomePage };
