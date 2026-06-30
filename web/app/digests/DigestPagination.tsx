'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface DigestPaginationProps {
  page: number;
  totalPages: number;
}

export function DigestPagination({ page, totalPages }: DigestPaginationProps) {
  const { lang } = useLanguage();

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-between pt-4 font-sans text-sm">
      {page > 1 ? (
        <Link href={`/digests?page=${page - 1}`} className="text-sage hover:text-sage-dark">
          {lang === 'ru' ? '← Назад' : '← Previous'}
        </Link>
      ) : (
        <span />
      )}
      <span className="text-muted">
        {lang === 'ru' ? `Страница ${page} из ${totalPages}` : `Page ${page} of ${totalPages}`}
      </span>
      {page < totalPages ? (
        <Link href={`/digests?page=${page + 1}`} className="text-sage hover:text-sage-dark">
          {lang === 'ru' ? 'Вперёд →' : 'Next →'}
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
