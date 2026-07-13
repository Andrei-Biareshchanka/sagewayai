import { describe, expect, it } from 'vitest';
import { formatChannelDigest, formatChannelDigestCaption } from './formatChannelDigest';
import { Digest } from './digestApi';

function buildDigest(overrides: Partial<Digest> = {}): Digest {
  return {
    date: '2026-07-10',
    slug: 'the-captain-and-the-storm',
    imageUrl: null,
    title: 'Штурвал держат изнутри, не снаружи',
    quote: { text: 'Не событие расстраивает человека, а его суждение о нём.', author: 'Марк Аврелий' },
    parable: {
      title: 'Капитан и буря',
      content:
        'Был капитан, который вышел в море.\n\nБуря пришла внезапно (как всегда) - и корабль качало.\n\nОн держал штурвал крепко!',
    },
    categoryName: 'Смысл',
    conclusion: 'Сила не в отсутствии бури, а в том, как ты держишь штурвал.',
    question: 'Что для тебя "шторм" сегодня?',
    ...overrides,
  };
}

describe('formatChannelDigest', () => {
  it('prefixes every blockquote line, including paragraph separators, with ">"', () => {
    const output = formatChannelDigest(buildDigest());
    const lines = output.split('\n');

    const blockquoteStart = lines.findIndex((line) => line.startsWith('>📖'));
    const blockquoteEnd = lines.findIndex((line, index) => index > blockquoteStart && !line.startsWith('>'));

    expect(blockquoteStart).toBeGreaterThanOrEqual(0);
    for (const line of lines.slice(blockquoteStart, blockquoteEnd)) {
      expect(line.startsWith('>')).toBe(true);
    }
  });

  it('never emits a bare ">" line as a paragraph separator', () => {
    const output = formatChannelDigest(buildDigest());
    const lines = output.split('\n');

    for (const line of lines) {
      expect(line).not.toBe('>');
    }
  });

  it('keeps the blockquote as a single contiguous block with no blank-line breaks inside it', () => {
    const output = formatChannelDigest(buildDigest());
    const lines = output.split('\n');

    const blockquoteStart = lines.findIndex((line) => line.startsWith('>📖'));
    const blockquoteEnd = lines.findIndex((line, index) => index > blockquoteStart && !line.startsWith('>'));

    expect(lines.slice(blockquoteStart, blockquoteEnd)).not.toContain('');
  });

  it('escapes MarkdownV2 special characters in the parable content', () => {
    const output = formatChannelDigest(
      buildDigest({
        parable: { title: 'Испытание', content: 'Текст с точкой. И (скобками) - и восклицанием!' },
      }),
    );

    expect(output).toContain('точкой\\.');
    expect(output).toContain('\\(скобками\\)');
    expect(output).toContain('\\-');
    expect(output).toContain('восклицанием\\!');
  });

  it('renders the AI-generated title in bold at the top when present', () => {
    const output = formatChannelDigest(buildDigest({ title: 'Заголовок дня' }));
    expect(output.split('\n')[0]).toBe('*Заголовок дня*');
  });

  it('omits the title block entirely when title is null', () => {
    const output = formatChannelDigest(buildDigest({ title: null }));
    expect(output.startsWith('💬')).toBe(true);
  });

  it('stays under the Telegram 4096-character message limit for a very long parable', () => {
    const longParagraph = 'Очень длинный абзац с текстом притчи, который повторяется много раз подряд. ';
    const content = Array.from({ length: 100 }, () => longParagraph.repeat(3)).join('\n\n');
    const output = formatChannelDigest(buildDigest({ parable: { title: 'Длинная притча', content } }));

    expect(output.length).toBeLessThanOrEqual(4096);
  });

  it('truncates the parable content with an ellipsis when the digest is too long', () => {
    const longParagraph = 'Очень длинный абзац с текстом притчи, который повторяется много раз подряд. ';
    const content = Array.from({ length: 100 }, () => longParagraph.repeat(3)).join('\n\n');
    const output = formatChannelDigest(buildDigest({ parable: { title: 'Длинная притча', content } }));

    expect(output).toContain('…');
    expect(output).toContain('❓ *Вопрос дня*');
  });

  it('leaves a short digest untouched (no truncation marker)', () => {
    const output = formatChannelDigest(buildDigest());
    expect(output).not.toContain('…');
  });

  it('ends with the hashtag line — fixed #Мудрость #Притчи, then the digest category', () => {
    const output = formatChannelDigest(buildDigest({ categoryName: 'Смысл' }));
    expect(output.trimEnd().endsWith('\\#Мудрость \\#Притчи \\#Смысл')).toBe(true);
  });
});

describe('formatChannelDigestCaption', () => {
  const siteUrl = 'https://sagewayai.com/ru/d/the-captain-and-the-storm';

  it('omits the "Вывод" section entirely', () => {
    const output = formatChannelDigestCaption(buildDigest(), siteUrl);
    expect(output).not.toContain('Вывод\\*');
    expect(output).not.toContain(buildDigest().conclusion);
  });

  it('renders the CTA as a clickable link to the site, not a plain line', () => {
    const output = formatChannelDigestCaption(buildDigest(), siteUrl);
    expect(output).toContain(`[💡 Вывод — на сайте](${siteUrl})`);
  });

  it('still includes the question', () => {
    const output = formatChannelDigestCaption(buildDigest(), siteUrl);
    expect(output).toContain('❓ *Вопрос дня*');
  });

  it('stays under the Telegram 1024-character caption limit for a very long parable', () => {
    const longParagraph = 'Очень длинный абзац с текстом притчи, который повторяется много раз подряд. ';
    const content = Array.from({ length: 100 }, () => longParagraph.repeat(3)).join('\n\n');
    const output = formatChannelDigestCaption(buildDigest({ parable: { title: 'Длинная притча', content } }), siteUrl);

    expect(output.length).toBeLessThanOrEqual(1024);
    expect(output).toContain('…');
  });

  it('leaves a normal-length digest well under the caption limit without truncation', () => {
    const output = formatChannelDigestCaption(buildDigest(), siteUrl);
    expect(output.length).toBeLessThanOrEqual(1024);
    expect(output).not.toContain('…');
  });

  it('ends with the hashtag line — fixed #Мудрость #Притчи, then the digest category', () => {
    const output = formatChannelDigestCaption(buildDigest({ categoryName: 'Риск' }), siteUrl);
    expect(output.trimEnd().endsWith('\\#Мудрость \\#Притчи \\#Риск')).toBe(true);
  });
});
