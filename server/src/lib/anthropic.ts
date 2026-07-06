import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

const MODEL = 'claude-sonnet-4-6';

const reflectionSchema = z.object({
  conclusion: z.string(),
  question: z.string(),
});

export type Reflection = z.infer<typeof reflectionSchema>;

const TITLE_INSTRUCTION_EN =
  'Write ONE short evocative page title (4–7 words) capturing the unique connection between this quote and parable. No generic phrases, no quotes or punctuation at the end. Essay/book chapter tone. Respond with ONLY the title.';

const TITLE_INSTRUCTION_RU =
  'Напиши ОДИН короткий выразительный заголовок (4–7 слов), передающий уникальную связь между цитатой и притчей. Без общих фраз, без кавычек. Тон эссе или главы книги. Ответь ТОЛЬКО заголовком.';

function buildTitleContext(
  quoteText: string,
  author: string,
  parableTitle: string,
  moral: string,
  theme: string | null,
  language: 'en' | 'ru',
): string {
  return language === 'ru'
    ? `Цитата: "${quoteText}" — ${author}\nПритча: "${parableTitle}". Мораль: ${moral}${theme ? `\nТема: ${theme}` : ''}`
    : `Quote: "${quoteText}" — ${author}\nParable: "${parableTitle}". Moral: ${moral}${theme ? `\nTheme: ${theme}` : ''}`;
}

function buildTitlePrompt(
  quoteText: string,
  author: string,
  parableTitle: string,
  moral: string,
  theme: string | null,
  language: 'en' | 'ru',
): string {
  const instruction = language === 'ru' ? TITLE_INSTRUCTION_RU : TITLE_INSTRUCTION_EN;
  const context = buildTitleContext(quoteText, author, parableTitle, moral, theme, language);
  return `${instruction}\n\n${context}`;
}

function extractTitle(response: Anthropic.Message): string {
  const block = response.content[0];
  if (block?.type !== 'text') throw new Error(`Unexpected response block type: ${block?.type}`);
  return block.text.trim().replace(/^["«]|["»]$/g, '').trim();
}

export async function generateDigestTitle(
  quoteText: string,
  author: string,
  parableTitle: string,
  moral: string,
  theme: string | null,
  language: 'en' | 'ru',
): Promise<string> {
  const response = await getClient().messages.create({
    model: MODEL,
    max_tokens: 50,
    temperature: 0.8,
    messages: [{ role: 'user', content: buildTitlePrompt(quoteText, author, parableTitle, moral, theme, language) }],
  });
  return extractTitle(response);
}

function getClient(): Anthropic {
  const apiKey = process.env['ANTHROPIC_API_KEY'];
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set');
  return new Anthropic({ apiKey });
}

function buildPrompt(quoteText: string, parableText: string, language: 'en' | 'ru'): string {
  const languageName = language === 'ru' ? 'Russian' : 'English';
  return `You are writing for a daily wisdom app called SagewayAI. A user just read this quote and parable, paired because they reinforce the same idea:

Quote: "${quoteText}"

Parable: "${parableText}"

Write, in ${languageName}:
1. "conclusion" — a short (2-4 sentences) reflective insight that connects the quote and the parable into one wise takeaway. Write it so the reader can compare it with their own interpretation, not as a lecture.
2. "question" — one open reflection question (1 sentence) that invites the reader to apply this idea to their own life.`;
}

const SUBMIT_REFLECTION_TOOL: Anthropic.Tool = {
  name: 'submit_reflection',
  description: 'Submit the reflective conclusion and reflection question for this quote and parable pairing.',
  strict: true,
  input_schema: {
    type: 'object',
    properties: {
      conclusion: { type: 'string' },
      question: { type: 'string' },
    },
    required: ['conclusion', 'question'],
    additionalProperties: false,
  },
};

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
    tools: [SUBMIT_REFLECTION_TOOL],
    tool_choice: { type: 'tool', name: 'submit_reflection' },
    messages: [{ role: 'user', content: buildPrompt(quoteText, parableText, language) }],
  });

  const block = response.content[0];
  if (block?.type !== 'tool_use') {
    throw new Error(`Unexpected response block type: ${block?.type}`);
  }

  const result = reflectionSchema.safeParse(block.input);
  if (!result.success) {
    throw new Error(`Invalid reflection shape: ${result.error.issues[0]?.message}`);
  }
  return result.data;
}
