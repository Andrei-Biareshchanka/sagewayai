import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { useCategories } from '@/categories/useCategories';
import { ParableCard } from '@/home/StoryMiniCard';
import { useFavorites } from './useFavorites';

function CollectionPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useFavorites();
  const { data: categories } = useCategories();

  const categoryMap = useMemo(
    () => Object.fromEntries((categories ?? []).map((c) => [c.id, c.name])),
    [categories],
  );

  const totalPages = data ? Math.ceil(data.total / data.limit) : 0;

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-[#6B7280]">
        Loading...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-12">
      <h1 className="mb-8 font-serif text-4xl font-semibold text-[#1A1A1A]">My collection</h1>

      {data?.data.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-[#6B7280]">
          <p>No favorites yet.</p>
          <Link to="/explore" className="text-sm text-[#6B8F71] hover:underline">
            Explore parables →
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-5">
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
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-full border border-[rgba(0,0,0,0.15)] px-5 py-2 text-sm text-[#6B7280] transition-colors hover:border-[#6B8F71] hover:text-[#6B8F71] disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-sm text-[#6B7280]">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-full border border-[rgba(0,0,0,0.15)] px-5 py-2 text-sm text-[#6B7280] transition-colors hover:border-[#6B8F71] hover:text-[#6B8F71] disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export { CollectionPage };
