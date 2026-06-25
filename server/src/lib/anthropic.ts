import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

const MODEL = 'claude-sonnet-4-6';

const reflectionSchema = z.object({
  conclusion: z.string(),
  question: z.string(),
});

export type Reflection = z.infer<typeof reflectionSchema>;

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
