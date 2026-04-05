import { Link } from 'react-router-dom';

import type { Parable } from '@/types';

interface DailyParableCardProps {
  parable: Parable;
  categoryName: string;
}

function DailyParableCard({ parable, categoryName }: DailyParableCardProps) {
  return (
    <div className="mx-auto max-w-[1200px] px-6 pb-12">
      <div className="rounded-[12px] border border-[rgba(0,0,0,0.08)] bg-[#F0F4F0] p-10">
        <div className="mb-5 flex items-center gap-3">
          <span className="rounded-full bg-[#6B8F71] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.5px] text-white">
            Parable of the day
          </span>
          <span className="text-[11px] uppercase tracking-[0.5px] text-[#6B7280]">
            {categoryName}
          </span>
        </div>

        <h2 className="mb-4 max-w-2xl font-serif text-4xl font-semibold leading-snug text-[#1A1A1A]">
          {parable.title}
        </h2>

        <p className="mb-6 max-w-2xl text-base leading-relaxed text-[#6B7280]">
          {parable.content}
        </p>

        <p className="mb-8 max-w-2xl text-sm italic text-[#3D6142]">
          «{parable.moral}»
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-[#6B7280]">
            {parable.readTime} min read
            {parable.source ? ` · ${parable.source}` : ''}
          </span>
          <Link
            to={`/parables/${parable.id}`}
            className="rounded-full border border-[#6B8F71] px-6 py-2 text-sm font-medium text-[#6B8F71] transition-colors hover:bg-[#6B8F71] hover:text-white"
          >
            Read parable
          </Link>
        </div>
      </div>
    </div>
  );
}

export { DailyParableCard };
