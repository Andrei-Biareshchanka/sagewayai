'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';

export function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="bg-canvas border-t border-[var(--color-border)] py-8 mt-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between">
        <span className="font-sans text-sm text-muted">
          {t(lang, 'dailyWisdomTagline')}
        </span>
        <span className="font-sans text-sm text-ink font-medium">© 2026 SagewayAI</span>
      </div>
    </footer>
  );
}
