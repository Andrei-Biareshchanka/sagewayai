import { Digest } from './digestApi';
import { escapeMarkdown } from './markdown';

export function formatDigest(digest: Digest, revealHint: string): string {
  return [
    `💬 _${escapeMarkdown(digest.quote.text)}_`,
    `— ${escapeMarkdown(digest.quote.author)}`,
    '',
    `📖 *${escapeMarkdown(digest.parable.title)}*`,
    '',
    escapeMarkdown(digest.parable.content),
    '',
    `_${escapeMarkdown(revealHint)}_`,
    '',
    `||💡 ${escapeMarkdown(digest.conclusion)}||`,
    `||❓ ${escapeMarkdown(digest.question)}||`,
  ].join('\n');
}
