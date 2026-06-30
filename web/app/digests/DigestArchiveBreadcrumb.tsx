'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export function DigestArchiveBreadcrumb() {
  const { lang } = useLanguage();

  return (
    <nav className="font-sans text-sm text-muted flex items-center gap-1.5">
      <Link href="/" className="hover:text-ink transition-colors">
        {lang === 'ru' ? 'Главная' : 'Home'}
      </Link>
      <span>/</span>
      <span>{lang === 'ru' ? 'Архив дайджестов' : 'Digest archive'}</span>
    </nav>
  );
}
