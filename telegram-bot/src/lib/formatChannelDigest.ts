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

// "#" is a reserved MarkdownV2 character — Telegram rejects the whole message with a
// parse error if it appears unescaped outside of designated entity syntax. Escaping it
// still renders a literal "#" in the final text, which Telegram's client then detects as
// a clickable hashtag entity independently of the Markdown source (hashtag detection runs
// on the rendered text, not the raw markup).
function buildHashtagLine(digest: Digest): string {
  return `\\#Мудрость \\#Притчи \\#${escapeMarkdown(digest.categoryName)}`;
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
    '',
    buildHashtagLine(digest),
  ];
}

// Used as a sendPhoto caption (see broadcast.ts) when the digest has an image, so the
// whole post — photo + text — travels as a single forwardable/shareable message. Fallback
// shape when the full body (with "Вывод") doesn't fit under Telegram's much tighter caption
// limit: drops "Вывод" and links to it on the site instead, so the parable itself never
// gets truncated just to make room for the reflection — see formatChannelDigestCaption.
// The CTA line is itself the link (no separate inline keyboard button — one click-through
// path, not two).
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
    '',
    buildHashtagLine(digest),
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

// For sendPhoto's caption — tighter limit (1024 vs 4096). Three-tier fallback:
// 1. Full body with "Вывод" included, parable untruncated — used whenever it fits.
// 2. "Вывод" replaced by a link to the site, parable still untruncated.
// 3. Same as (2), but the parable is truncated to fit (formatWithLimit's binary search).
// The parable is never truncated just to make room for "Вывод" — dropping it for a link
// is always preferred over cutting the parable short.
export function formatChannelDigestCaption(digest: Digest, siteUrl: string): string {
  const withConclusion = renderMessage(digest, buildFullBodyLines);
  if (withConclusion.length <= TELEGRAM_CAPTION_LIMIT) return withConclusion;

  return formatWithLimit(digest, TELEGRAM_CAPTION_LIMIT, (d) => buildCaptionBodyLines(d, siteUrl));
}
