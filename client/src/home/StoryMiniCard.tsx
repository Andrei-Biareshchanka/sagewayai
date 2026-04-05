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
      className="group flex flex-col rounded-[12px] border border-[rgba(0,0,0,0.08)] bg-white p-6 transition-shadow hover:shadow-sm"
    >
      <span className="mb-3 text-[11px] font-medium uppercase tracking-[0.5px] text-[#6B8F71]">
        {categoryName}
      </span>

      <h3 className="mb-3 font-serif text-xl font-semibold leading-snug text-[#1A1A1A] transition-colors group-hover:text-[#6B8F71]">
        {parable.title}
      </h3>

      <p className="mb-5 flex-1 text-sm italic leading-relaxed text-[#6B7280]">
        «{parable.moral}»
      </p>

      <span className="text-xs text-[#6B7280]">{parable.readTime} min read</span>
    </Link>
  );
}

export { ParableCard };
