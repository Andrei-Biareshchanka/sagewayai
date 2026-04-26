import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './authStore';

const MOCK_USER = { id: 'user-1', email: 'test@example.com', role: 'USER' as const };

beforeEach(() => {
  useAuthStore.setState({ user: null, accessToken: null });
});

describe('authStore', () => {
  it('starts with no user and no token', () => {
    const { user, accessToken } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(accessToken).toBeNull();
  });

  it('setAuth stores user and token', () => {
    useAuthStore.getState().setAuth(MOCK_USER, 'token-abc');

    const { user, accessToken } = useAuthStore.getState();
    expect(user).toEqual(MOCK_USER);
    expect(accessToken).toBe('token-abc');
  });

  it('clearAuth resets both user and token to null', () => {
    useAuthStore.getState().setAuth(MOCK_USER, 'token-abc');
    useAuthStore.getState().clearAuth();

    const { user, accessToken } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(accessToken).toBeNull();
  });

  it('setAuth replaces existing auth state', () => {
    const otherUser = { id: 'user-2', email: 'other@example.com', role: 'ADMIN' as const };
    useAuthStore.getState().setAuth(MOCK_USER, 'token-1');
    useAuthStore.getState().setAuth(otherUser, 'token-2');

    const { user, accessToken } = useAuthStore.getState();
    expect(user).toEqual(otherUser);
    expect(accessToken).toBe('token-2');
  });
});
