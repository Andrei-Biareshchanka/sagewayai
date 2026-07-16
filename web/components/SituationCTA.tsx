'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';

export function SituationCTA() {
  const { lang } = useLanguage();

  return (
    <div className="flex justify-center">
      <Link
        href={`/${lang}/search`}
        className="inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-white font-sans font-medium rounded-card px-5 py-3 transition-colors"
      >
        {t(lang, 'situationCtaButton')}
      </Link>
    </div>
  );
}
