'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';

const BOT_URL = process.env.NEXT_PUBLIC_BOT_URL ?? 'https://t.me/sagewayai_bot';

const PERKS = {
  ru: [
    { icon: '💬', text: 'Цитата мудреца — слова, которые остаются' },
    { icon: '📖', text: 'Притча — короткая история с глубоким смыслом' },
    { icon: '💡', text: 'Рефлексия и вывод — осмыслить прочитанное' },
    { icon: '❓', text: 'Вопрос для размышления — унести с собой в день' },
  ],
  en: [
    { icon: '💬', text: 'A quote from the wise — words that stay with you' },
    { icon: '📖', text: 'A parable — a short story with a deeper meaning' },
    { icon: '💡', text: 'Reflection and conclusion — to sit with what you read' },
    { icon: '❓', text: 'A question to carry into your day' },
  ],
} as const;

interface CTABlockProps {
  source: string;
}

export function CTABlock({ source }: CTABlockProps) {
  const { lang } = useLanguage();

  const handleSubscribeClick = () => {
    window.gtag?.('event', 'telegram_subscribe_click', { source });
  };

  return (
    <div className="bg-sage-light rounded-card p-6 sm:p-8 space-y-5">
      <h2 className="font-serif text-xl font-semibold text-ink">
        {t(lang, 'ctaHeading')}
      </h2>

      <ul className="space-y-3">
        {PERKS[lang].map(({ icon, text }) => (
          <li key={icon} className="flex items-start gap-3">
            <span className="text-base leading-snug">{icon}</span>
            <span className="font-sans text-sm text-ink leading-snug">{text}</span>
          </li>
        ))}
      </ul>

      <div className="flex justify-center">
        <a
          href={BOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleSubscribeClick}
          className="inline-flex items-center gap-2.5 bg-sage hover:bg-sage-dark text-white font-sans font-medium rounded-card px-6 py-3 transition-colors"
        >
        <TelegramIcon />
          {t(lang, 'subscribeButton')}
        </a>
      </div>
    </div>
  );
}

function TelegramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.286c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.935z" />
    </svg>
  );
}
