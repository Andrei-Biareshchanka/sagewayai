import { describe, it, expect } from 'vitest';
import { formatDigest } from './formatDigest';

const digest = {
  date: '2026-06-25',
  quote: { text: 'Difficulties strengthen the mind.', author: 'Seneca' },
  parable: { title: 'The Mountain Climber', content: 'A climber faced a steep ridge.' },
  conclusion: 'Growth comes from the climb, not the summit.',
  question: 'What climb are you avoiding right now?',
};

describe('formatDigest', () => {
  it('formats quote, parable and spoiler sections', () => {
    const result = formatDigest(digest, 'Tap to reveal');

    expect(result).toContain('Difficulties strengthen the mind\\.');
    expect(result).toContain('— Seneca');
    expect(result).toContain('📖 *The Mountain Climber*');
    expect(result).toContain('A climber faced a steep ridge\\.');
    expect(result).toContain('_Tap to reveal_');
    expect(result).toContain('||💡 Growth comes from the climb, not the summit\\.||');
    expect(result).toContain('||❓ What climb are you avoiding right now?||');
  });

  it('escapes markdown special characters', () => {
    const result = formatDigest(
      { ...digest, parable: { title: 'Title.', content: 'Content (with) special!' } },
      'Hint',
    );

    expect(result).toContain('Title\\.');
    expect(result).toContain('Content \\(with\\) special\\!');
  });
});
