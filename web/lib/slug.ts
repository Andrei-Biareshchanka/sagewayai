import { transliterate } from 'transliteration';

export function generateSlug(title: string): string {
  return transliterate(title)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
