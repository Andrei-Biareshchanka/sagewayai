import { useMemo, useState } from 'react';

import { useCategories } from '@/categories/useCategories';
import { useParables } from '@/parables/useParables';
import { ParableCard } from '@/home/StoryMiniCard';

function ExplorePage() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const { data: categories } = useCategories();
  const { data, isLoading, isError } = useParables({
    category: activeSlug ?? undefined,
    page,
    limit: 20,
  });

  const categoryMap = useMemo(
    () => Object.fromEntries((categories ?? []).map((c) => [c.id, c.name])),
    [categories],
  );

  const totalPages = data ? Math.ceil(data.total / data.limit) : 0;

  const handleCategoryChange = (slug: string | null) => {
    setActiveSlug(slug);
    setPage(1);
  };

  return (
    <main className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="mb-8 font-serif text-3xl font-semibold text-[#1A1A1A] sm:text-4xl">Explore parables</h1>

      <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => handleCategoryChange(null)}
          className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors ${
            activeSlug === null
              ? 'bg-[#6B8F71] text-white'
              : 'bg-[#E8F0E8] text-[#3D6142] hover:bg-[#d8e8d8]'
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
                ? 'bg-[#6B8F71] text-white'
                : 'bg-[#E8F0E8] text-[#3D6142] hover:bg-[#d8e8d8]'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="flex min-h-[40vh] items-center justify-center text-[#6B7280]">
          Loading...
        </div>
      )}

      {isError && (
        <div className="flex min-h-[40vh] items-center justify-center text-[#6B7280]">
          Failed to load parables.
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(data?.data ?? []).map((parable) => (
              <ParableCard
                key={parable.id}
                parable={parable}
                categoryName={categoryMap[parable.categoryId] ?? ''}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                className="rounded-full border border-[rgba(0,0,0,0.08)] px-5 py-2 text-sm text-[#6B7280] transition-colors hover:border-[#6B8F71] hover:text-[#6B8F71] disabled:opacity-30"
              >
                ← Previous
              </button>
              <span className="text-sm text-[#6B7280]">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
                className="rounded-full border border-[rgba(0,0,0,0.08)] px-5 py-2 text-sm text-[#6B7280] transition-colors hover:border-[#6B8F71] hover:text-[#6B8F71] disabled:opacity-30"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export { ExplorePage };
