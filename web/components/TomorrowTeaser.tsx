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
    <div className="bg-canvas border border-sage-pill rounded-2xl p-8 text-center space-y-2.5">
      <p className="font-sans text-sm text-muted tracking-wide">
        {lang === 'ru' ? 'Завтра в SagewayAI:' : 'Tomorrow on SagewayAI:'}
      </p>

      <h3 className="font-serif text-2xl font-semibold text-ink">{title}</h3>

      <p className="font-sans text-sm text-sage">
        {lang === 'ru' ? 'притча · цитата · рефлексия · вопрос' : 'parable · quote · reflection · question'}
      </p>
    </div>
  );
}
