import { describe, it, expect } from 'vitest';
import { formatParable } from './formatParable';

describe('formatParable', () => {
  it('formats title and content', () => {
    const result = formatParable({
      title: 'The Empty Cup',
      content: 'A scholar came to visit a Zen master.',
      source: null,
      titleRu: null,
      contentRu: null,
    }, 'en');

    expect(result).toContain('📖 *The Empty Cup*');
    expect(result).toContain('A scholar came to visit a Zen master\\.');
  });

  it('appends source when present', () => {
    const result = formatParable({
      title: 'The Empty Cup',
      content: 'A scholar came to visit a Zen master.',
      source: 'Zen tradition',
      titleRu: null,
      contentRu: null,
    }, 'en');

    expect(result).toContain('_— Zen tradition_');
  });

  it('omits source line when source is null', () => {
    const result = formatParable({
      title: 'The Empty Cup',
      content: 'A scholar came to visit.',
      source: null,
      titleRu: null,
      contentRu: null,
    }, 'en');

    expect(result).not.toContain('_—');
  });

  it('escapes markdown special characters in title', () => {
    const result = formatParable({
      title: 'Title (with) special.chars',
      content: 'Content.',
      source: null,
      titleRu: null,
      contentRu: null,
    }, 'en');

    expect(result).toContain('\\(with\\)');
    expect(result).toContain('special\\.chars');
  });

  it('escapes markdown special characters in content', () => {
    const result = formatParable({
      title: 'Title',
      content: 'He said: "Hello!" and smiled.',
      source: null,
      titleRu: null,
      contentRu: null,
    }, 'en');

    expect(result).toContain('"Hello\\!" and smiled\\.');
  });

  it('uses the Russian title and content when language is ru', () => {
    const result = formatParable({
      title: 'The Empty Cup',
      content: 'A scholar came to visit a Zen master.',
      source: null,
      titleRu: 'Пустая чашка',
      contentRu: 'Учёный пришёл к мастеру дзен.',
    }, 'ru');

    expect(result).toContain('📖 *Пустая чашка*');
    expect(result).toContain('Учёный пришёл к мастеру дзен\\.');
  });

  it('falls back to English when Russian translation is missing', () => {
    const result = formatParable({
      title: 'The Empty Cup',
      content: 'A scholar came to visit a Zen master.',
      source: null,
      titleRu: null,
      contentRu: null,
    }, 'ru');

    expect(result).toContain('📖 *The Empty Cup*');
    expect(result).toContain('A scholar came to visit a Zen master\\.');
  });
});
