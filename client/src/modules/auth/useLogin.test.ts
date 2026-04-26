import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { createElement } from 'react';

import { server } from '@/test/setup';
import { useAuthStore } from './authStore';
import { useLogin } from './useLogin';

const MOCK_AUTH_RESPONSE = {
  accessToken: 'token-abc',
  user: { id: 'user-1', email: 'test@example.com', role: 'USER' as const },
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

describe('useLogin', () => {
  it('stores user and token in auth store on success', async () => {
    server.use(
      http.post('http://localhost:3001/api/auth/login', () =>
        HttpResponse.json(MOCK_AUTH_RESPONSE),
      ),
    );

    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });

    act(() => {
      result.current.mutate({ email: 'test@example.com', password: 'password123' });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const { user, accessToken } = useAuthStore.getState();
    expect(user).toEqual(MOCK_AUTH_RESPONSE.user);
    expect(accessToken).toBe('token-abc');
  });

  it('sets error state on failed login and does not update store', async () => {
    server.use(
      http.post('http://localhost:3001/api/auth/login', () =>
        HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 }),
      ),
    );

    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });

    act(() => {
      result.current.mutate({ email: 'test@example.com', password: 'wrong' });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(useAuthStore.getState().user).toBeNull();
  });
});
