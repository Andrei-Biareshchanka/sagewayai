'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';

export function DigestArchiveBreadcrumb() {
  const { lang } = useLanguage();

  return (
    <nav className="font-sans text-sm text-muted flex items-center gap-1.5">
      <Link href={`/${lang}`} className="hover:text-ink transition-colors">
        {t(lang, 'navHome')}
      </Link>
      <span>/</span>
      <span>{t(lang, 'archiveTitle')}</span>
    </nav>
  );
}
