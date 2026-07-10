import { Digest } from './digestApi';
import { escapeMarkdown } from './markdown';

function buildTitleLines(title: string | null): string[] {
  return title ? [`*${escapeMarkdown(title)}*`, ''] : [];
}

// A bare ">" line as a paragraph separator is unspecified by Telegram's MarkdownV2
// blockquote parser (undocumented whether it merges, drops, or 400s). A zero-width
// space after ">" keeps the line non-empty so it reliably stays part of the quote.
const BLOCKQUOTE_PARAGRAPH_SEPARATOR = '\n>\u200B\n';

function buildParableBlockquoteLines(title: string, content: string): string[] {
  const titleBlock = `>📖 *${escapeMarkdown(title)}*`;
  const paragraphBlocks = content.split('\n\n').map((paragraph) =>
    escapeMarkdown(paragraph)
      .split('\n')
      .map((line) => `>${line}`)
      .join('\n'),
  );
  return [titleBlock, ...paragraphBlocks].join(BLOCKQUOTE_PARAGRAPH_SEPARATOR).split('\n');
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

// Telegram's sendMessage rejects text longer than this with 400 "message is too long".
const TELEGRAM_MESSAGE_LIMIT = 4096;
const TRUNCATION_MARKER = '…';

function renderMessage(digest: Digest): string {
  return [...buildTitleLines(digest.title), ...buildBodyLines(digest)].join('\n');
}

function truncateParableContentToFit(digest: Digest): string {
  const original = digest.parable.content;
  let low = 0;
  let high = original.length;
  let best = TRUNCATION_MARKER;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const lastSpace = original.lastIndexOf(' ', mid);
    const cutAt = lastSpace > 0 ? lastSpace : mid;
    const candidateContent = `${original.slice(0, cutAt).trimEnd()}${TRUNCATION_MARKER}`;
    const candidate = renderMessage({ ...digest, parable: { ...digest.parable, content: candidateContent } });

    if (candidate.length <= TELEGRAM_MESSAGE_LIMIT) {
      best = candidateContent;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return best;
}

export function formatChannelDigest(digest: Digest): string {
  const message = renderMessage(digest);
  if (message.length <= TELEGRAM_MESSAGE_LIMIT) return message;

  const content = truncateParableContentToFit(digest);
  return renderMessage({ ...digest, parable: { ...digest.parable, content } });
}
