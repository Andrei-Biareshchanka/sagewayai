export type Lang = 'en' | 'ru';

export function pickLocalized(ru: string | null | undefined, en: string | null | undefined, lang: Lang): string {
  return lang === 'ru' ? (ru ?? en ?? '') : (en ?? ru ?? '');
}
