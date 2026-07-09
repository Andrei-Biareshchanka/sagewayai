import { Digest } from './digestApi';
import { escapeMarkdown } from './markdown';

function buildTitleLines(title: string | null): string[] {
  return title ? [`*${escapeMarkdown(title)}*`, ''] : [];
}

function buildParableBlockquoteLines(title: string, content: string): string[] {
  const titleBlock = `>📖 *${escapeMarkdown(title)}*`;
  const paragraphBlocks = content.split('\n\n').map((paragraph) =>
    escapeMarkdown(paragraph)
      .split('\n')
      .map((line) => `>${line}`)
      .join('\n'),
  );
  return [titleBlock, ...paragraphBlocks].join('\n>\n').split('\n');
}

function buildBodyLines(digest: Digest): string[] {
  return [
    `💬 ${escapeMarkdown(digest.quote.text)}`,
    `— ${escapeMarkdown(digest.quote.author)}`,
    '',
    ...buildParableBlockquoteLines(digest.parable.title, digest.parable.content),
    '',
    '💡 *Вывод*',
    escapeMarkdown(digest.conclusion),
    '',
    '❓ *Вопрос дня*',
    escapeMarkdown(digest.question),
  ];
}

export function formatChannelDigest(digest: Digest): string {
  return [...buildTitleLines(digest.title), ...buildBodyLines(digest)].join('\n');
}
