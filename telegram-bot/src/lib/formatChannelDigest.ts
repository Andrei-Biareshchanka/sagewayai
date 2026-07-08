import { Digest } from './digestApi';
import { escapeMarkdown } from './markdown';

function buildTitleLines(title: string | null): string[] {
  return title ? [`*${escapeMarkdown(title)}*`, ''] : [];
}

function buildBodyLines(digest: Digest, dateLabel: string): string[] {
  return [
    `✨ Мудрость дня \\| ${escapeMarkdown(dateLabel)}`,
    '',
    `💬 ${escapeMarkdown(digest.quote.text)}`,
    `— ${escapeMarkdown(digest.quote.author)}`,
    '',
    `📖 ${escapeMarkdown(digest.parable.title)}`,
    escapeMarkdown(digest.parable.content),
    '',
    '💡 Вывод',
    escapeMarkdown(digest.conclusion),
    '',
    '❓ Вопрос дня',
    escapeMarkdown(digest.question),
  ];
}

export function formatChannelDigest(digest: Digest, dateLabel: string): string {
  return [...buildTitleLines(digest.title), ...buildBodyLines(digest, dateLabel)].join('\n');
}
