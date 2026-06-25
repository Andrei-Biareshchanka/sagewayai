import { escapeMarkdown } from './markdown';

type DigestQuote = { text: string; author: string };
type DigestParable = { title: string; content: string };

export function formatDigestTeaser(quote: DigestQuote, parable: DigestParable): string {
  return [
    `💬 _${escapeMarkdown(quote.text)}_`,
    `— ${escapeMarkdown(quote.author)}`,
    '',
    `📖 *${escapeMarkdown(parable.title)}*`,
    '',
    escapeMarkdown(parable.content),
  ].join('\n');
}

export function formatDigestReveal(conclusion: string, question: string): string {
  return [
    `💡 ${escapeMarkdown(conclusion)}`,
    '',
    `❓ _${escapeMarkdown(question)}_`,
  ].join('\n');
}
