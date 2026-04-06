import type { Category } from '@/types';

interface HeroSectionProps {
  categories: Category[];
  activeSlug: string | null;
  onCategoryChange: (slug: string | null) => void;
}

function HeroSection({ categories, activeSlug, onCategoryChange }: HeroSectionProps) {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 sm:py-16">
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.5px] text-[#6B7280]">
        Parable library
      </p>

      <h1 className="mb-10 max-w-2xl font-serif text-3xl font-semibold leading-tight text-[#1A1A1A] sm:text-5xl">
        The right story{' '}
        <em className="font-normal italic text-[#6B8F71]">for this moment</em>
      </h1>

      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => onCategoryChange(null)}
          className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors ${
            activeSlug === null
              ? 'bg-[#6B8F71] text-white'
              : 'bg-[#E8F0E8] text-[#3D6142] hover:bg-[#d8e8d8]'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.slug)}
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
    </section>
  );
}

export { HeroSection };
