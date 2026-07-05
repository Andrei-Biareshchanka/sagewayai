'use client';

import { useLanguage } from '@/contexts/LanguageContext';

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

  const title = lang === 'ru' ? tomorrow.titleRu : tomorrow.titleEn;

  return (
    <div className="bg-sage-light rounded-card p-6 space-y-3">
      <p className="font-sans text-sm text-muted">
        {lang === 'ru' ? 'Завтра в SagewayAI:' : 'Tomorrow on SagewayAI:'}
      </p>

      <h3 className="font-serif text-xl font-semibold text-ink">{title}</h3>

      <p className="font-sans text-xs text-sage-muted">
        {lang === 'ru' ? 'притча · цитата · рефлексия' : 'parable · quote · reflection'}
      </p>
    </div>
  );
}
