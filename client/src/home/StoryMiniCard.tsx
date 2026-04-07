import { Link } from 'react-router-dom';

import type { Parable } from '@/types';

interface ParableCardProps {
  parable: Parable;
  categoryName: string;
}

function ParableCard({ parable, categoryName }: ParableCardProps) {
  return (
    <Link
      to={`/parables/${parable.id}`}
      className="group flex flex-col rounded-card border border-border bg-white p-6 transition-shadow hover:shadow-sm"
    >
      <span className="mb-3 text-[11px] font-medium uppercase tracking-[0.5px] text-sage">
        {categoryName}
      </span>

      <h3 className="mb-3 font-serif text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-sage">
        {parable.title}
      </h3>

      <p className="mb-5 flex-1 text-sm italic leading-relaxed text-muted">
        «{parable.moral}»
      </p>

      <span className="text-xs text-muted">{parable.readTime} min read</span>
    </Link>
  );
}

export { ParableCard };
