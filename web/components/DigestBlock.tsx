'use client';

import { format } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';
import Link from 'next/link';
import { colors } from '@/lib/brand';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLocalized } from '@/lib/locale-content';
import { ShareButton } from './ShareButton';

export interface DigestData {
  quote: { text: string; author: string };
  parable: { title: string; content: string };
  conclusion: string;
  question: string;
}

export interface DigestCategory {
  name: string;
  nameRu: string | null;
  slug: string;
}

interface DigestBlockProps {
  title?: string;
  data: DigestData;
  date?: Date;
  category?: DigestCategory;
  shareUrl?: string;
  shareTitle?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export function DigestBlock({ title, data, date, category, shareUrl, shareTitle, imageUrl, imageAlt }: DigestBlockProps) {
  const { lang } = useLanguage();
  const { quote, parable, conclusion, question } = data;
  const dateLocale = lang === 'ru' ? ru : enUS;
  const categoryName = category ? pickLocalized(category.nameRu, category.name, lang) : null;

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <span className="text-xs font-medium text-sage bg-sage-pill px-3 py-1.5 rounded-full">
          {lang === 'ru' ? 'Мудрость дня' : 'Daily wisdom'}
        </span>
      </div>

      <div className="border border-sage-pill rounded-2xl p-6 md:p-8 space-y-6">
        {(date || category) && (
          <div className="flex justify-between items-center">
            {date ? (
              <span className="text-sm text-muted">{format(date, 'd MMMM yyyy', { locale: dateLocale })}</span>
            ) : (
              <span />
            )}
            {category && (
              <Link
                href={`/${lang}/digests?category=${category.slug}`}
                className="text-xs font-medium text-sage-dark bg-sage-light hover:bg-sage-pill px-3 py-1 rounded-full transition-colors"
              >
                {categoryName}
              </Link>
            )}
          </div>
        )}

        {title && <h1 className="font-serif text-2xl md:text-3xl font-semibold text-ink">{title}</h1>}

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

        {imageUrl && (
          <img
            src={imageUrl}
            alt={imageAlt ?? title ?? parable.title}
            loading="lazy"
            className="w-full h-auto rounded-xl object-cover"
          />
        )}

        <hr className="border-[var(--color-border)]" />

        <h2 className="font-serif text-lg font-semibold text-ink">{parable.title}</h2>

        <p className="font-serif text-base leading-[1.8] text-ink">{parable.content}</p>

        <div
          className="bg-sage-light border-l-4 border-sage rounded-card p-4 space-y-1"
          style={{ borderLeftColor: colors.sage }}
        >
          <p className="font-sans text-sm font-medium text-sage">
            {lang === 'ru' ? '💡 Резюме' : '💡 Summary'}
          </p>
          <p className="font-serif text-base text-ink">{conclusion}</p>
        </div>

        <div className="bg-sage-pill rounded-card p-4 space-y-1">
          <p className="font-sans text-sm font-medium text-sage-dark">
            {lang === 'ru' ? '❓ Вопрос' : '❓ Question'}
          </p>
          <p className="font-sans text-base text-ink">{question}</p>
        </div>

        {shareUrl && (
          <div className="border-t border-sage-pill pt-4 mt-2 flex justify-end">
            <ShareButton
              url={shareUrl}
              title={shareTitle ?? parable.title}
              text={`"${quote.text}" — ${quote.author}`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
