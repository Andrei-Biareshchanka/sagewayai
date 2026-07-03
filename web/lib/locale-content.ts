import type { Locale } from '@/lib/locales';

export function pickLocalized(
  ru: string | null | undefined,
  en: string | null | undefined,
  locale: Locale,
): string {
  return locale === 'ru' ? (ru ?? en ?? '') : (en ?? ru ?? '');
}
