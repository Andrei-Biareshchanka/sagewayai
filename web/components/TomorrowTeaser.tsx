'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { pickLocalized } from '@/lib/locale-content';
import { t } from '@/lib/i18n';

export interface TomorrowDigestData {
  titleRu: string;
  titleEn: string;
}

interface TomorrowTeaserProps {
  tomorrow: TomorrowDigestData | null;
}

export function TomorrowTeaser({ tomorrow }: TomorrowTeaserProps) {
  const { lang } = useLanguage();

  if (!tomorrow) return null;

  const title = pickLocalized(tomorrow.titleRu, tomorrow.titleEn, lang);

  return (
    <div className="bg-canvas border border-sage-pill rounded-2xl p-8 text-center space-y-2.5">
      <p className="font-sans text-sm text-muted tracking-wide">
        {t(lang, 'tomorrowPrefix')}
      </p>

      <h3 className="font-serif text-2xl font-semibold text-ink">{title}</h3>

      <p className="font-sans text-sm text-sage">
        {t(lang, 'digestTagline')}
      </p>
    </div>
  );
}
