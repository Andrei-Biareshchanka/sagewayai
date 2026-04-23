import type { Category } from '@/categories/types';
import { cn } from '@/lib/cn';

interface CategoryPillsProps {
  categories: Category[];
  activeSlug: string | null;
  onChange: (slug: string | null) => void;
}

function CategoryPills({ categories, activeSlug, onChange }: CategoryPillsProps) {
  const pillClass = (isActive: boolean) =>
    cn('shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors', {
      'bg-sage text-white': isActive,
      'bg-sage-pill text-sage-dark hover:bg-sage-pill-hover': !isActive,
    });

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      <button onClick={() => onChange(null)} className={pillClass(activeSlug === null)}>
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onChange(category.slug)}
          className={pillClass(activeSlug === category.slug)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

export { CategoryPills };
