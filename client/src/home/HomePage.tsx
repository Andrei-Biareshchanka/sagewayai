import { useNavigate } from 'react-router-dom';

import { useCategories } from '@/categories/useCategories';
import { useCategoryMap } from '@/shared/hooks/useCategoryMap';
import { useDailyParable } from '@/parables/useDailyParable';
import { useParables } from '@/parables/useParables';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { DailyParableCardSkeleton } from '@/shared/ui/DailyParableCardSkeleton';
import { ParableCardSkeleton } from '@/shared/ui/ParableCardSkeleton';
import { DailyParableCard } from '@/parables/DailyParableCard';
import { HeroSection } from './HeroSection';
import { ParableCard } from '@/parables/ParableCard';
import { SubscribeForm } from './SubscribeForm';

function HomePage() {
  const navigate = useNavigate();

  const { data: daily, isLoading: dailyLoading } = useDailyParable();
  const { data: parablesData, isLoading: parablesLoading } = useParables({ limit: 3 });
  const { data: categories } = useCategories();
  const categoryMap = useCategoryMap();

  useDocumentTitle('SagewayAI — The daily parable that resonates');

  const handleCategoryChange = (slug: string | null) => {
    if (slug) {
      navigate(`/explore?category=${slug}`);
    } else {
      navigate('/explore');
    }
  };

  return (
    <main>
      <HeroSection
        categories={categories ?? []}
        activeSlug={null}
        onCategoryChange={handleCategoryChange}
      />

      {dailyLoading ? (
        <DailyParableCardSkeleton />
      ) : (
        daily && (
          <DailyParableCard
            parable={daily}
            categoryName={categoryMap[daily.categoryId] ?? ''}
          />
        )
      )}

      <section className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-6 sm:pb-20">
        <h2 className="mb-6 font-serif text-2xl font-semibold text-ink">More parables</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {parablesLoading
            ? Array.from({ length: 3 }).map((_, i) => <ParableCardSkeleton key={i} />)
            : (parablesData?.data ?? []).map((parable) => (
                <ParableCard
                  key={parable.id}
                  parable={parable}
                  categoryName={categoryMap[parable.categoryId] ?? ''}
                />
              ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 pb-20 sm:px-6">
        <SubscribeForm />
      </section>
    </main>
  );
}

export { HomePage };
