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

function buildFullBodyLines(digest: Digest): string[] {
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

// Used as a sendPhoto caption (see broadcast.ts) when the digest has an image, so the
// whole post — photo + text — travels as a single forwardable/shareable message. Drops
// the "Вывод" section (kept only in the full text-only format below) specifically to fit
// under Telegram's much tighter caption limit; the reflection stays a reason to click
// through to the site rather than duplicating it in the channel. The CTA line is itself
// the link (no separate inline keyboard button — one click-through path, not two).
function buildCaptionBodyLines(digest: Digest, siteUrl: string): string[] {
  return [
    `💬 ${escapeMarkdown(digest.quote.text)}`,
    `— ${escapeMarkdown(digest.quote.author)}`,
    '',
    ...buildParableBlockquoteLines(digest.parable.title, digest.parable.content),
    '',
    '❓ *Вопрос дня*',
    escapeMarkdown(digest.question),
    '',
    `[💡 Вывод — на сайте](${siteUrl})`,
  ];
}

// Telegram's sendMessage rejects text longer than this with 400 "message is too long".
const TELEGRAM_MESSAGE_LIMIT = 4096;
// Telegram's sendPhoto caption limit — far tighter than the message limit above.
const TELEGRAM_CAPTION_LIMIT = 1024;
const TRUNCATION_MARKER = '…';

type BodyBuilder = (digest: Digest) => string[];

function renderMessage(digest: Digest, buildBody: BodyBuilder): string {
  return [...buildTitleLines(digest.title), ...buildBody(digest)].join('\n');
}

function truncateParableContentToFit(digest: Digest, limit: number, buildBody: BodyBuilder): string {
  const original = digest.parable.content;
  let low = 0;
  let high = original.length;
  let best = TRUNCATION_MARKER;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const lastSpace = original.lastIndexOf(' ', mid);
    const cutAt = lastSpace > 0 ? lastSpace : mid;
    const candidateContent = `${original.slice(0, cutAt).trimEnd()}${TRUNCATION_MARKER}`;
    const candidate = renderMessage({ ...digest, parable: { ...digest.parable, content: candidateContent } }, buildBody);

    if (candidate.length <= limit) {
      best = candidateContent;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return best;
}

function formatWithLimit(digest: Digest, limit: number, buildBody: BodyBuilder): string {
  const message = renderMessage(digest, buildBody);
  if (message.length <= limit) return message;

  const content = truncateParableContentToFit(digest, limit, buildBody);
  return renderMessage({ ...digest, parable: { ...digest.parable, content } }, buildBody);
}

export function formatChannelDigest(digest: Digest): string {
  return formatWithLimit(digest, TELEGRAM_MESSAGE_LIMIT, buildFullBodyLines);
}

// For sendPhoto's caption — shorter format (no "Вывод"), tighter limit (1024 vs 4096).
export function formatChannelDigestCaption(digest: Digest, siteUrl: string): string {
  return formatWithLimit(digest, TELEGRAM_CAPTION_LIMIT, (d) => buildCaptionBodyLines(d, siteUrl));
}
