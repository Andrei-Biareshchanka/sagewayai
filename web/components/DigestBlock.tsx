'use client';

import { colors } from '@/lib/brand';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShareButton } from './ShareButton';

export interface DigestData {
  quote: { text: string; author: string };
  parable: { title: string; content: string };
  conclusion: string;
  question: string;
}

interface DigestBlockProps {
  data: DigestData;
  shareUrl?: string;
  shareTitle?: string;
}

export function DigestBlock({ data, shareUrl, shareTitle }: DigestBlockProps) {
  const { lang } = useLanguage();
  const { quote, parable, conclusion, question } = data;

  return (
    <div className="space-y-6">
      <p className="font-sans text-xs tracking-widest text-sage uppercase">
        {lang === 'ru' ? 'Мудрость дня' : 'Daily Wisdom'}
      </p>

      <figure className="relative pl-10">
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 font-serif text-[5rem] text-sage opacity-20 leading-none select-none"
        >
          &ldquo;
        </span>
        <blockquote className="font-serif italic text-xl text-ink leading-relaxed">
          {quote.text}
        </blockquote>
        <figcaption className="font-sans text-sm text-muted text-right mt-3">
          — {quote.author}
        </figcaption>
      </figure>

      <hr className="border-[var(--color-border)]" />

      <h2 className="font-serif text-lg font-semibold text-ink">{parable.title}</h2>

      <p className="font-serif text-base leading-[1.8] text-ink">{parable.content}</p>

      <div className="bg-sage-pill rounded-card p-4 space-y-1">
        <p className="font-sans text-xs font-medium text-sage-dark uppercase tracking-wide">
          {lang === 'ru' ? 'Вопрос' : 'Question'}
        </p>
        <p className="font-sans text-base text-ink">{question}</p>
      </div>

      <div
        className="bg-sage-light border-l-4 border-sage rounded-card p-4 space-y-1"
        style={{ borderLeftColor: colors.sage }}
      >
        <p className="font-sans text-xs font-medium text-sage uppercase tracking-wide">
          {lang === 'ru' ? 'Резюме' : 'Summary'}
        </p>
        <p className="font-serif text-base text-ink">{conclusion}</p>
      </div>

      {shareUrl && (
        <ShareButton
          url={shareUrl}
          title={shareTitle ?? parable.title}
          text={`"${quote.text}" — ${quote.author}`}
        />
      )}
    </div>
  );
}
