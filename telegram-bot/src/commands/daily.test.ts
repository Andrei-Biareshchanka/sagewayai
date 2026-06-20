import { describe, it, expect } from 'vitest';

// extracted for testing — mirrors the private function in daily.ts
function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&');
}

function formatParable(parable: {
  title: string;
  content: string;
  source?: string | null;
}): string {
  const lines: string[] = [
    `📖 *${escapeMarkdown(parable.title)}*`,
    '',
    escapeMarkdown(parable.content),
  ];

  if (parable.source) {
    lines.push('', `_— ${escapeMarkdown(parable.source)}_`);
  }

  return lines.join('\n');
}

describe('formatParable', () => {
  it('formats title and content', () => {
    const result = formatParable({
      title: 'The Empty Cup',
      content: 'A scholar came to visit a Zen master.',
    });

    expect(result).toContain('📖 *The Empty Cup*');
    expect(result).toContain('A scholar came to visit a Zen master\\.');
  });

  it('appends source when present', () => {
    const result = formatParable({
      title: 'The Empty Cup',
      content: 'A scholar came to visit a Zen master.',
      source: 'Zen tradition',
    });

    expect(result).toContain('_— Zen tradition_');
  });

  it('omits source line when source is null', () => {
    const result = formatParable({
      title: 'The Empty Cup',
      content: 'A scholar came to visit.',
      source: null,
    });

    expect(result).not.toContain('_—');
  });

  it('escapes markdown special characters in title', () => {
    const result = formatParable({
      title: 'Title (with) special.chars',
      content: 'Content.',
    });

    expect(result).toContain('\\(with\\)');
    expect(result).toContain('special\\.chars');
  });

  it('escapes markdown special characters in content', () => {
    const result = formatParable({
      title: 'Title',
      content: 'He said: "Hello!" and smiled.',
    });

    expect(result).toContain('"Hello\\!" and smiled\\.');
  });
});
