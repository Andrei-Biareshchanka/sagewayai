import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

const MODEL = 'claude-sonnet-4-6';

const reflectionSchema = z.object({
  conclusion: z.string(),
  question: z.string(),
});

export type Reflection = z.infer<typeof reflectionSchema>;

function buildTitlePrompt(
  quoteText: string,
  author: string,
  parableTitle: string,
  moral: string,
  theme: string | null,
  language: 'en' | 'ru',
): string {
  if (language === 'ru') {
    return `Ты пишешь SEO-заголовок для страницы на сайте мудрости SagewayAI.

Цитата: "${quoteText}" — ${author}
Притча: "${parableTitle}". Мораль: ${moral}${theme ? `\nТема: ${theme}` : ''}

Напиши ОДИН короткий выразительный заголовок (4–7 слов) который передаёт уникальную связь между этой цитатой и притчей.

Требования:
- Без общих фраз ("Мудрость дня", "Урок дня", "Притча о...")
- Без кавычек и знаков препинания в конце
- Звучит как название эссе или главы книги
- Отражает конкретный инсайт этой пары

Ответь ТОЛЬКО заголовком — без пояснений, без кавычек.`;
  }

  return `You are writing an SEO page title for a wisdom website called SagewayAI.

Quote: "${quoteText}" — ${author}
Parable: "${parableTitle}". Moral: ${moral}${theme ? `\nTheme: ${theme}` : ''}

Write ONE short evocative page title (4–7 words) that captures the unique connection between this quote and parable.

Rules:
- No generic phrases ("Daily wisdom", "Lesson of the day", "A parable about...")
- No quotes or punctuation at the end
- Feels like an essay or book chapter title
- Must reflect the specific insight of this pair

Respond with ONLY the title — no explanation, no quotes.`;
}

export async function generateDigestTitle(
  quoteText: string,
  author: string,
  parableTitle: string,
  moral: string,
  theme: string | null,
  language: 'en' | 'ru',
): Promise<string> {
  const client = getClient();

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 50,
    temperature: 0.8,
    messages: [
      {
        role: 'user',
        content: buildTitlePrompt(quoteText, author, parableTitle, moral, theme, language),
      },
    ],
  });

  const block = response.content[0];
  if (block?.type !== 'text') {
    throw new Error(`Unexpected response block type: ${block?.type}`);
  }

  return block.text.trim().replace(/^["«]|["»]$/g, '').trim();
}

function getClient(): Anthropic {
  const apiKey = process.env['ANTHROPIC_API_KEY'];
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set');
  return new Anthropic({ apiKey });
}

function extractJson(rawText: string): unknown {
  const trimmed = rawText.trim();
  const withoutFences = trimmed.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  return JSON.parse(withoutFences);
}

function buildPrompt(quoteText: string, parableText: string, language: 'en' | 'ru'): string {
  const languageName = language === 'ru' ? 'Russian' : 'English';
  return `You are writing for a daily wisdom app called SagewayAI. A user just read this quote and parable, paired because they reinforce the same idea:

Quote: "${quoteText}"

Parable: "${parableText}"

Write, in ${languageName}:
1. "conclusion" — a short (2-4 sentences) reflective insight that connects the quote and the parable into one wise takeaway. Write it so the reader can compare it with their own interpretation, not as a lecture.
2. "question" — one open reflection question (1 sentence) that invites the reader to apply this idea to their own life.

Respond with ONLY a raw JSON object shaped like: {"conclusion": "...", "question": "..."}
No markdown code fences, no commentary — just the JSON object.`;
}

export async function generateReflection(
  quoteText: string,
  parableText: string,
  language: 'en' | 'ru',
): Promise<Reflection> {
  const client = getClient();

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1000,
    temperature: 0.7,
    messages: [{ role: 'user', content: buildPrompt(quoteText, parableText, language) }],
  });

  const block = response.content[0];
  if (block?.type !== 'text') {
    throw new Error(`Unexpected response block type: ${block?.type}`);
  }

  const parsed = extractJson(block.text);
  const result = reflectionSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error(`Invalid reflection shape: ${result.error.issues[0]?.message}`);
  }
  return result.data;
}
