import type { Category } from '@/shared/types';

interface HeroSectionProps {
  categories: Category[];
  activeSlug: string | null;
  onCategoryChange: (slug: string | null) => void;
}

function HeroSection({ categories, activeSlug, onCategoryChange }: HeroSectionProps) {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 sm:py-16">
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.5px] text-muted">
        Parable library
      </p>

      <h1 className="mb-10 max-w-2xl font-serif text-3xl font-semibold leading-tight text-ink sm:text-5xl">
        The right story{' '}
        <em className="font-normal italic text-sage">for this moment</em>
      </h1>

      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => onCategoryChange(null)}
          className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors ${
            activeSlug === null
              ? 'bg-sage text-white'
              : 'bg-sage-pill text-sage-dark hover:bg-sage-pill-hover'
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
                ? 'bg-sage text-white'
                : 'bg-sage-pill text-sage-dark hover:bg-sage-pill-hover'
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
