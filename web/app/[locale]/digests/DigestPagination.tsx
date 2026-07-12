'use client';

import Link from 'next/link';
import { useLanguage, type Lang } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';

interface DigestPaginationProps {
  page: number;
  totalPages: number;
  categorySlug: string | undefined;
}

function pageHref(lang: Lang, page: number, categorySlug: string | undefined): string {
  const params = new URLSearchParams();
  if (categorySlug) params.set('category', categorySlug);
  if (page > 1) params.set('page', String(page));
  const query = params.toString();
  return query ? `/${lang}/digests?${query}` : `/${lang}/digests`;
}

export function DigestPagination({ page, totalPages, categorySlug }: DigestPaginationProps) {
  const { lang } = useLanguage();

  return (
    <nav className="flex items-center justify-between pt-4 font-sans text-sm">
      {page > 1 ? (
        <Link href={pageHref(lang, page - 1, categorySlug)} className="text-sage hover:text-sage-dark">
          {t(lang, 'prevPage')}
        </Link>
      ) : (
        <span />
      )}
      <span className="text-muted">
        {t(lang, 'pageOfTotal').replace('{page}', String(page)).replace('{total}', String(totalPages))}
      </span>
      {page < totalPages ? (
        <Link href={pageHref(lang, page + 1, categorySlug)} className="text-sage hover:text-sage-dark">
          {t(lang, 'nextPage')}
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
