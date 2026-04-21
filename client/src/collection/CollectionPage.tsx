import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useCategoryMap } from '@/shared/hooks/useCategoryMap';
import { ParableCard } from '@/parables/ParableCard';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';
import { PaginationControls } from '@/shared/ui/PaginationControls';
import { useFavorites } from './useFavorites';

function CollectionPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useFavorites();
  const categoryMap = useCategoryMap();

  const totalPages = data ? Math.ceil(data.total / data.limit) : 0;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-12">
      <h1 className="mb-8 font-serif text-4xl font-semibold text-ink">My collection</h1>

      {data?.data.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-muted">
          <p>No favorites yet.</p>
          <Link to="/explore" className="text-sm text-sage hover:underline">
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
            <PaginationControls
              page={page}
              totalPages={totalPages}
              onPrev={() => setPage((p) => Math.max(1, p - 1))}
              onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
            />
          )}
        </>
      )}
    </main>
  );
}

export { CollectionPage };
