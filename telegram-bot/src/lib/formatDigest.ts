import { Digest } from './digestApi';
import { escapeMarkdown } from './markdown';

export interface DigestLabels {
  revealHint: string;
  labelReflection: string;
  labelQuestion: string;
  shareLabel?: string;
  shareUrl?: string;
}

export function formatDigest(digest: Digest, labels: DigestLabels): string {
  const lines = [
    `💬 _${escapeMarkdown(digest.quote.text)}_`,
    `— ${escapeMarkdown(digest.quote.author)}`,
    '',
    `📖 *${escapeMarkdown(digest.parable.title)}*`,
    '',
    escapeMarkdown(digest.parable.content),
    '',
    `_${escapeMarkdown(labels.revealHint)}_`,
    '',
    `*${escapeMarkdown(labels.labelReflection)}*`,
    `||${escapeMarkdown(digest.conclusion)}||`,
    '',
    `*${escapeMarkdown(labels.labelQuestion)}*`,
    escapeMarkdown(digest.question),
  ];

  if (labels.shareLabel && labels.shareUrl) {
    lines.push('', `[${escapeMarkdown(labels.shareLabel)}](${labels.shareUrl})`);
  }

  return lines.join('\n');
}
