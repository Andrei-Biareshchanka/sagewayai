import { describe, it, expect } from 'vitest';
import { formatDigestTeaser, formatDigestReveal } from './formatDigest';

describe('formatDigestTeaser', () => {
  it('formats quote and parable', () => {
    const result = formatDigestTeaser(
      { text: 'Difficulties strengthen the mind.', author: 'Seneca' },
      { title: 'The Mountain Climber', content: 'A climber faced a steep ridge.' },
    );

    expect(result).toContain('Difficulties strengthen the mind\\.');
    expect(result).toContain('— Seneca');
    expect(result).toContain('📖 *The Mountain Climber*');
    expect(result).toContain('A climber faced a steep ridge\\.');
  });

  it('escapes markdown special characters', () => {
    const result = formatDigestTeaser(
      { text: 'Quote (with) special.chars!', author: 'Author' },
      { title: 'Title.', content: 'Content!' },
    );

    expect(result).toContain('\\(with\\)');
    expect(result).toContain('special\\.chars\\!');
    expect(result).toContain('Title\\.');
    expect(result).toContain('Content\\!');
  });
});

describe('formatDigestReveal', () => {
  it('formats conclusion and question', () => {
    const result = formatDigestReveal(
      'Growth comes from the climb, not the summit.',
      'What climb are you avoiding right now?',
    );

    expect(result).toContain('💡 Growth comes from the climb, not the summit\\.');
    expect(result).toContain('❓ _What climb are you avoiding right now?_');
  });
});
