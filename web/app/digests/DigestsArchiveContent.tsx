'use client';

import { ru, enUS } from 'date-fns/locale';
import { useLanguage } from '@/contexts/LanguageContext';
import { DigestArchiveBreadcrumb } from './DigestArchiveBreadcrumb';
import { DigestCard, type DigestSummary } from './DigestCard';
import { DigestPagination } from './DigestPagination';

interface DigestsArchiveContentProps {
  digests: DigestSummary[];
  page: number;
  totalPages: number;
}

export function DigestsArchiveContent({ digests, page, totalPages }: DigestsArchiveContentProps) {
  const { lang } = useLanguage();
  const dateLocale = lang === 'ru' ? ru : enUS;

  return (
    <div className="space-y-8">
      <DigestArchiveBreadcrumb />

      <h1 className="font-serif text-3xl font-semibold text-ink">
        {lang === 'ru' ? 'Архив дайджестов' : 'Digest archive'}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {digests.map((digest) => (
          <DigestCard key={digest.slug} digest={digest} dateLocale={dateLocale} />
        ))}
      </div>

      <DigestPagination page={page} totalPages={totalPages} />
    </div>
  );
}
