'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface DigestPaginationProps {
  page: number;
  totalPages: number;
  categorySlug: string | undefined;
}

function pageHref(page: number, categorySlug: string | undefined): string {
  const params = new URLSearchParams();
  if (categorySlug) params.set('category', categorySlug);
  if (page > 1) params.set('page', String(page));
  const query = params.toString();
  return query ? `/digests?${query}` : '/digests';
}

export function DigestPagination({ page, totalPages, categorySlug }: DigestPaginationProps) {
  const { lang } = useLanguage();

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-between pt-4 font-sans text-sm">
      {page > 1 ? (
        <Link href={pageHref(page - 1, categorySlug)} className="text-sage hover:text-sage-dark">
          {lang === 'ru' ? '← Назад' : '← Previous'}
        </Link>
      ) : (
        <span />
      )}
      <span className="text-muted">
        {lang === 'ru' ? `Страница ${page} из ${totalPages}` : `Page ${page} of ${totalPages}`}
      </span>
      {page < totalPages ? (
        <Link href={pageHref(page + 1, categorySlug)} className="text-sage hover:text-sage-dark">
          {lang === 'ru' ? 'Вперёд →' : 'Next →'}
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
