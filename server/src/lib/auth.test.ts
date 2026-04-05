import { describe, it, expect } from 'vitest';

import {
  hashPassword,
  verifyPassword,
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from './auth';

describe('password helpers', () => {
  it('hashPassword produces a verifiable hash', async () => {
    const hash = await hashPassword('my-password');
    expect(hash).not.toBe('my-password');
    await expect(verifyPassword('my-password', hash)).resolves.toBe(true);
  });

  it('verifyPassword returns false for wrong password', async () => {
    const hash = await hashPassword('correct');
    await expect(verifyPassword('wrong', hash)).resolves.toBe(false);
  });
});

describe('JWT access token', () => {
  it('round-trip returns sub and role', () => {
    const token = signAccessToken('user-123', 'USER');
    const payload = verifyAccessToken(token);
    expect(payload.sub).toBe('user-123');
    expect(payload.role).toBe('USER');
  });

  it('throws on tampered token', () => {
    const token = signAccessToken('user-123', 'USER');
    expect(() => verifyAccessToken(token + 'x')).toThrow();
  });

  it('throws on token signed with wrong secret', () => {
    const token = signRefreshToken('user-123'); // signed with REFRESH_SECRET
    expect(() => verifyAccessToken(token)).toThrow();
  });
});

describe('JWT refresh token', () => {
  it('round-trip returns sub', () => {
    const token = signRefreshToken('user-456');
    const payload = verifyRefreshToken(token);
    expect(payload.sub).toBe('user-456');
  });

  it('throws on tampered token', () => {
    const token = signRefreshToken('user-456');
    expect(() => verifyRefreshToken(token + 'x')).toThrow();
  });

  it('throws on token signed with wrong secret', () => {
    const token = signAccessToken('user-456', 'USER'); // signed with ACCESS_SECRET
    expect(() => verifyRefreshToken(token)).toThrow();
  });
});
