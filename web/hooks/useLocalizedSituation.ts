import { useMemo } from 'react';
import type { Lang } from '@/contexts/LanguageContext';
import { pickLocalized } from '@/lib/locale-content';

export interface BilingualSituationParable {
  slugRu: string;
  slugEn: string;
  titleRu: string;
  titleEn: string;
  moralRu: string;
  moralEn: string;
  imageUrl: string | null;
  imageAltRu: string | null;
  imageAltEn: string | null;
  noteRu: string | null;
  noteEn: string | null;
}

export interface BilingualSituationContent {
  slugRu: string;
  slugEn: string;
  h1Ru: string;
  h1En: string;
  introRu: string;
  introEn: string;
  parables: BilingualSituationParable[];
}

export interface LocalizedSituationParable {
  slug: string;
  title: string;
  moral: string;
  imageUrl: string | null;
  imageAlt: string | undefined;
  note: string | null;
}

export interface LocalizedSituation {
  h1: string;
  intro: string;
  parables: LocalizedSituationParable[];
}

export function useLocalizedSituation(situation: BilingualSituationContent, lang: Lang): LocalizedSituation {
  return useMemo(
    () => ({
      h1: pickLocalized(situation.h1Ru, situation.h1En, lang),
      intro: pickLocalized(situation.introRu, situation.introEn, lang),
      parables: situation.parables.map((p) => ({
        slug: lang === 'ru' ? p.slugRu : p.slugEn,
        title: pickLocalized(p.titleRu, p.titleEn, lang),
        moral: pickLocalized(p.moralRu, p.moralEn, lang),
        imageUrl: p.imageUrl,
        imageAlt: (lang === 'ru' ? p.imageAltRu : p.imageAltEn) ?? undefined,
        note: pickLocalized(p.noteRu, p.noteEn, lang) || null,
      })),
    }),
    [situation, lang],
  );
}
