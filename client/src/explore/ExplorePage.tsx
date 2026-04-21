import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useCategories } from '@/categories/useCategories';
import { useCategoryMap } from '@/categories/useCategoryMap';
import { useParables } from '@/parables/useParables';
import { useDocumentTitle } from '@/lib/useDocumentTitle';
import { PaginationControls } from '@/lib/PaginationControls';
import { ParableCard } from '@/parables/ParableCard';

function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const activeSlug = searchParams.get('category');

  const { data: categories } = useCategories();
  const categoryMap = useCategoryMap();
  const { data, isLoading, isError } = useParables({
    category: activeSlug ?? undefined,
    page,
    limit: 20,
  });

  const activeCategory = categories?.find((c) => c.slug === activeSlug);
  const pageTitle = activeCategory ? `${activeCategory.name} — SagewayAI` : 'Explore — SagewayAI';

  useDocumentTitle(pageTitle);

  const totalPages = data ? Math.ceil(data.total / data.limit) : 0;

  const handleCategoryChange = (slug: string | null) => {
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
    setPage(1);
  };

  return (
    <main className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="mb-8 font-serif text-3xl font-semibold text-ink sm:text-4xl">Explore parables</h1>

      <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => handleCategoryChange(null)}
          className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors ${
            activeSlug === null
              ? 'bg-sage text-white'
              : 'bg-sage-pill text-sage-dark hover:bg-sage-pill-hover'
          }`}
        >
          All
        </button>
        {(categories ?? []).map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.slug)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors ${
              activeSlug === category.slug
                ? 'bg-sage text-white'
                : 'bg-sage-pill text-sage-dark hover:bg-sage-pill-hover'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="flex min-h-[40vh] items-center justify-center text-muted">
          Loading...
        </div>
      )}

      {isError && (
        <div className="flex min-h-[40vh] items-center justify-center text-muted">
          Failed to load parables.
        </div>
      )}

      {!isLoading && !isError && (
        <>
          {data?.data.length === 0 ? (
            <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-center">
              <p className="font-serif text-xl text-ink">No parables yet</p>
              <p className="text-sm text-muted">
                {activeSlug
                  ? 'This category has no parables yet. Try another one.'
                  : 'The library is empty.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {(data?.data ?? []).map((parable) => (
                <ParableCard
                  key={parable.id}
                  parable={parable}
                  categoryName={categoryMap[parable.categoryId] ?? ''}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <PaginationControls
              page={page}
              totalPages={totalPages}
              onPrev={() => setPage((p) => p - 1)}
              onNext={() => setPage((p) => p + 1)}
            />
          )}
        </>
      )}
    </main>
  );
}

export { ExplorePage };
