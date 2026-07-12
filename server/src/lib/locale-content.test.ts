import { describe, it, expect } from 'vitest';
import { pickLocalized } from './locale-content';

describe('pickLocalized', () => {
  it('returns the ru value on ru locale', () => {
    expect(pickLocalized('привет', 'hello', 'ru')).toBe('привет');
  });

  it('returns the en value on en locale', () => {
    expect(pickLocalized('привет', 'hello', 'en')).toBe('hello');
  });

  it('falls back to en when ru is missing on ru locale', () => {
    expect(pickLocalized(null, 'hello', 'ru')).toBe('hello');
  });

  it('falls back to ru when en is missing on en locale', () => {
    expect(pickLocalized('привет', null, 'en')).toBe('привет');
  });

  it('returns empty string when both are missing', () => {
    expect(pickLocalized(null, null, 'ru')).toBe('');
  });
});
