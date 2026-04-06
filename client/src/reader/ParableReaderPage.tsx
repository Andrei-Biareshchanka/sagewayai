import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAuthStore } from '@/auth/authStore';
import { useCategories } from '@/categories/useCategories';
import { useParable } from '@/parables/useParables';
import { useFavorites, useToggleFavorite } from '@/collection/useFavorites';

function ParableReaderPage() {
  const { id } = useParams<{ id: string }>();
  const { data: parable, isLoading, isError } = useParable(id!);
  const { data: categories } = useCategories();
  const user = useAuthStore((s) => s.user);
  const { data: favorites } = useFavorites();

  const isFavorited = Boolean(favorites?.data.some((f) => f.id === id));
  const { mutate: toggleFavorite, isPending: toggling } = useToggleFavorite(id!, isFavorited);

  const categoryName = useMemo(() => {
    if (!parable || !categories) return '';
    return categories.find((c) => c.id === parable.categoryId)?.name ?? '';
  }, [parable, categories]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-[#6B7280]">
        Loading...
      </div>
    );
  }

  if (isError || !parable) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-[#6B7280]">
        <p>Parable not found.</p>
        <Link to="/explore" className="text-sm text-[#6B8F71] hover:underline">
          ← Back to explore
        </Link>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-[680px] px-4 py-10 sm:px-6 sm:py-16">
      <Link
        to="/explore"
        className="mb-8 inline-block text-sm text-[#6B7280] transition-colors hover:text-[#1A1A1A]"
      >
        ← Back to explore
      </Link>

      <div className="mb-4 flex flex-wrap gap-2 text-sm text-[#6B7280]">
        {categoryName && <span>{categoryName}</span>}
        {categoryName && <span>·</span>}
        <span>{parable.readTime} min read</span>
        {parable.source && (
          <>
            <span>·</span>
            <span>{parable.source}</span>
          </>
        )}
      </div>

      <h1 className="mb-8 font-serif text-3xl font-semibold leading-tight text-[#1A1A1A] sm:text-4xl">
        {parable.title}
      </h1>

      <p className="mb-10 font-serif text-lg leading-[1.8] text-[#1A1A1A]">
        {parable.content}
      </p>

      <blockquote className="rounded-r-[8px] border-l-4 border-[#6B8F71] bg-[#F0F4F0] px-6 py-4">
        <p className="font-serif text-base italic text-[#3D6142]">«{parable.moral}»</p>
      </blockquote>

      {user && (
        <button
          onClick={() => toggleFavorite()}
          disabled={toggling}
          className={`mt-8 flex items-center gap-2 rounded-full border px-5 py-2 text-sm transition-colors disabled:opacity-60 ${
            isFavorited
              ? 'border-[#6B8F71] bg-[#F0F4F0] text-[#3D6142]'
              : 'border-[rgba(0,0,0,0.15)] text-[#6B7280] hover:border-[#6B8F71] hover:text-[#6B8F71]'
          }`}
        >
          {isFavorited ? '♥ Saved to collection' : '♡ Save to collection'}
        </button>
      )}
    </main>
  );
}

export { ParableReaderPage };
