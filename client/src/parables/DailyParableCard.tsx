import { Link } from 'react-router-dom';

import type { Parable } from './types';

interface DailyParableCardProps {
  parable: Parable;
  categoryName: string;
}

function DailyParableCard({ parable, categoryName }: DailyParableCardProps) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-10 sm:px-6 sm:pb-12">
      <div className="rounded-card border border-border bg-sage-light p-6 sm:p-10">
        <div className="mb-5 flex items-center gap-3">
          <span className="rounded-full bg-sage px-3 py-1 text-[11px] font-medium uppercase tracking-[0.5px] text-white">
            Parable of the day
          </span>
          <span className="text-[11px] uppercase tracking-[0.5px] text-muted">
            {categoryName}
          </span>
        </div>

        <h2 className="mb-4 max-w-2xl font-serif text-2xl font-semibold leading-snug text-ink sm:text-4xl">
          {parable.title}
        </h2>

        <p className="mb-6 max-w-2xl text-base leading-relaxed text-muted">
          {parable.content}
        </p>

        <p className="mb-8 max-w-2xl text-sm italic text-sage-dark">
          «{parable.moral}»
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-muted">
            {parable.readTime} min read
            {parable.source ? ` · ${parable.source}` : ''}
          </span>
          <Link
            to={`/parables/${parable.id}`}
            className="self-start rounded-full border border-sage px-6 py-2 text-sm font-medium text-sage transition-colors hover:bg-sage hover:text-white sm:self-auto"
          >
            Read parable
          </Link>
        </div>
      </div>
    </div>
  );
}

export { DailyParableCard };
