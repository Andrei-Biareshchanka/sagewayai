import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { createElement } from 'react';

import { server } from '@/test/setup';
import { useAuthStore } from './authStore';
import { useRegister } from './useRegister';

const MOCK_AUTH_RESPONSE = {
  accessToken: 'token-xyz',
  user: { id: 'user-2', email: 'new@example.com', role: 'USER' as const },
};

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
}

beforeEach(() => {
  useAuthStore.setState({ user: null, accessToken: null });
});

describe('useRegister', () => {
  it('stores user and token in auth store on success', async () => {
    server.use(
      http.post('http://localhost:3001/api/auth/register', () =>
        HttpResponse.json(MOCK_AUTH_RESPONSE, { status: 201 }),
      ),
    );

    const { result } = renderHook(() => useRegister(), { wrapper: createWrapper() });

    act(() => {
      result.current.mutate({ email: 'new@example.com', password: 'password123' });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const { user, accessToken } = useAuthStore.getState();
    expect(user).toEqual(MOCK_AUTH_RESPONSE.user);
    expect(accessToken).toBe('token-xyz');
  });

  it('sets error state when email is already in use', async () => {
    server.use(
      http.post('http://localhost:3001/api/auth/register', () =>
        HttpResponse.json({ error: 'Email already in use' }, { status: 409 }),
      ),
    );

    const { result } = renderHook(() => useRegister(), { wrapper: createWrapper() });

    act(() => {
      result.current.mutate({ email: 'taken@example.com', password: 'password123' });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(useAuthStore.getState().user).toBeNull();
  });
});
