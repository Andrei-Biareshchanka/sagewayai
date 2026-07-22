import { useMemo } from 'react';
import type { Lang } from '@/contexts/LanguageContext';
import { pickLocalized } from '@/lib/locale-content';

export interface BilingualParableQuote {
  textRu: string;
  textEn: string;
  authorRu: string;
  authorEn: string;
  isPrimary: boolean;
}

export interface BilingualParableContent {
  titleRu: string;
  titleEn: string;
  contentRu: string;
  contentEn: string;
  imageUrl: string | null;
  imageAltRu: string | null;
  imageAltEn: string | null;
  conclusionRu: string;
  conclusionEn: string;
  questionsRu: string[];
  questionsEn: string[];
  quotes: BilingualParableQuote[];
}

export interface LocalizedParableQuote {
  text: string;
  author: string;
  isPrimary: boolean;
}

export interface LocalizedParable {
  title: string;
  content: string;
  imageAlt: string | undefined;
  conclusion: string;
  questions: string[];
  quotes: LocalizedParableQuote[];
}

export function useLocalizedParable(parable: BilingualParableContent, lang: Lang): LocalizedParable {
  return useMemo(
    () => ({
      title: pickLocalized(parable.titleRu, parable.titleEn, lang),
      content: pickLocalized(parable.contentRu, parable.contentEn, lang),
      imageAlt: (lang === 'ru' ? parable.imageAltRu : parable.imageAltEn) ?? undefined,
      conclusion: pickLocalized(parable.conclusionRu, parable.conclusionEn, lang),
      questions: lang === 'ru' ? parable.questionsRu : parable.questionsEn,
      quotes: parable.quotes.map((q) => ({
        text: pickLocalized(q.textRu, q.textEn, lang),
        author: pickLocalized(q.authorRu, q.authorEn, lang),
        isPrimary: q.isPrimary,
      })),
    }),
    [parable, lang],
  );
}
