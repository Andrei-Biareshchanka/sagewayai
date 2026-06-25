import * as dotenv from 'dotenv';
dotenv.config();

import * as fs from 'fs';
import * as path from 'path';
import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

const ANTHROPIC_API_KEY = process.env['ANTHROPIC_API_KEY'];
const MODEL = 'claude-sonnet-4-6';
const QUOTES_PER_THEME = 25;
const OUTPUT_PATH = path.join(__dirname, 'data', 'quotes-generated.json');

if (!ANTHROPIC_API_KEY) {
  process.stderr.write('ANTHROPIC_API_KEY is not set in .env\n');
  process.exit(1);
}

const THEMES = [
  'stoic-resilience',
  'stoic-virtue-and-character',
  'patience-and-time',
  'courage-and-fear',
  'wisdom-and-self-knowledge',
  'loss-and-acceptance',
] as const;

const quoteSchema = z.object({
  text: z.string(),
  textRu: z.string(),
  author: z.string(),
  authorRu: z.string(),
  theme: z.string(),
});

const quoteListSchema = z.array(quoteSchema);

type Quote = z.infer<typeof quoteSchema>;

const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

function buildPrompt(theme: string): string {
  return `Generate exactly ${QUOTES_PER_THEME} short, attributed wisdom quotes on the theme "${theme}" for a daily-wisdom app called SagewayAI.

Rules:
- Only use quotes attributed to authors whose original words are public domain (e.g. Stoic philosophers like Marcus Aurelius, Seneca, Epictetus; classic literary/philosophical figures like Tolstoy, Dostoevsky, Nietzsche). Do not invent fake attributions.
- "text" is the quote in English. "textRu" is the SAME quote rendered naturally in Russian (not a literal word-for-word translation — it should read like an idiomatic Russian quotation).
- "author" is the author's name in English (e.g. "Marcus Aurelius"). "authorRu" is the same author's name in standard Russian transliteration (e.g. "Марк Аврелий").
- "theme" must be exactly "${theme}" for every entry.
- No duplicate quotes within the list.
- Keep each quote under 240 characters.

Respond with ONLY a raw JSON array of ${QUOTES_PER_THEME} objects shaped like:
{"text": "...", "textRu": "...", "author": "...", "authorRu": "...", "theme": "${theme}"}

No markdown code fences, no commentary, no leading or trailing text — just the JSON array.`;
}

function extractJsonArray(rawText: string): unknown {
  const trimmed = rawText.trim();
  const withoutFences = trimmed.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  return JSON.parse(withoutFences);
}

async function generateQuotesForTheme(theme: string): Promise<Quote[]> {
  process.stdout.write(`Generating ${QUOTES_PER_THEME} quotes for theme "${theme}"...\n`);

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 6000,
    temperature: 0.7,
    messages: [{ role: 'user', content: buildPrompt(theme) }],
  });

  const block = response.content[0];
  if (block?.type !== 'text') {
    throw new Error(`Unexpected response block type for theme "${theme}": ${block?.type}`);
  }

  const parsed = extractJsonArray(block.text);
  const result = quoteListSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error(`Invalid quote shape for theme "${theme}": ${result.error.message}`);
  }
  return result.data;
}

function dedupe(quotes: Quote[]): Quote[] {
  const seen = new Set<string>();
  return quotes.filter((quote) => {
    const key = `${quote.text}::${quote.author}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function main(): Promise<void> {
  const allQuotes: Quote[] = [];

  for (const theme of THEMES) {
    const quotes = await generateQuotesForTheme(theme);
    allQuotes.push(...quotes);
  }

  const uniqueQuotes = dedupe(allQuotes);
  const duplicateCount = allQuotes.length - uniqueQuotes.length;

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(uniqueQuotes, null, 2));

  process.stdout.write(`Wrote ${uniqueQuotes.length} quotes to ${OUTPUT_PATH}\n`);
  if (duplicateCount > 0) {
    process.stdout.write(`Dropped ${duplicateCount} duplicate quote(s)\n`);
  }
}

main().catch((err) => {
  process.stderr.write(`${err}\n`);
  process.exit(1);
});
