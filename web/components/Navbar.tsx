'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import { LanguageToggle } from './LanguageToggle';

export function Navbar() {
  const { lang, setLang } = useLanguage();

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-[var(--color-border)]">
      <nav className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <img
            src="/favicon.svg"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 flex-shrink-0"
          />
          <img
            src="/sageway-logotype.svg"
            alt="SagewayAI"
            width={140}
            height={30}
            className="h-[30px] w-auto"
          />
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href={`/${lang}/digests`}
            className="font-sans text-sm text-muted hover:text-ink transition-colors"
          >
            {t(lang, 'archiveLink')}
          </Link>
          <LanguageToggle lang={lang} onChange={setLang} />
        </div>
      </nav>
    </header>
  );
}

