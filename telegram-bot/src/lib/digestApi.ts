import { z } from 'zod';
import { Language } from './i18n';

const API_URL = process.env['SAGEWAYAI_API_URL'] ?? 'http://localhost:3001';

const digestSchema = z.object({
  date: z.string(),
  slug: z.string().nullable(),
  imageUrl: z.string().nullable(),
  title: z.string().nullable(),
  quote: z.object({
    text: z.string(),
    author: z.string(),
  }),
  parable: z.object({
    title: z.string(),
    content: z.string(),
  }),
  categoryName: z.string(),
  conclusion: z.string(),
  question: z.string(),
});

export type Digest = z.infer<typeof digestSchema>;

export async function fetchDailyDigest(language: Language): Promise<Digest> {
  const response = await fetch(`${API_URL}/api/digest/daily?lang=${language}`);
  if (!response.ok) {
    throw new Error(`Digest API error ${response.status}`);
  }

  const result = digestSchema.safeParse(await response.json());
  if (!result.success) {
    throw new Error(`Invalid digest response: ${result.error.issues[0]?.message}`);
  }
  return result.data;
}

const situationDigestSchema = digestSchema.omit({ date: true, slug: true, imageUrl: true, title: true, categoryName: true });

export async function fetchSituationDigest(situation: string, language: Language, chatId: number): Promise<Digest> {
  const response = await fetch(`${API_URL}/api/digest/situation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ situation, lang: language, chatId: String(chatId) }),
  });
  if (!response.ok) {
    throw new Error(`Situation API error ${response.status}`);
  }

  const result = situationDigestSchema.safeParse(await response.json());
  if (!result.success) {
    throw new Error(`Invalid situation digest response: ${result.error.issues[0]?.message}`);
  }
  return { ...result.data, date: new Date().toISOString(), slug: null, imageUrl: null, title: null, categoryName: '' };
}
