import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { createElement } from 'react';

import { server } from '@/test/setup';
import { useAuthStore } from './authStore';
import { useLogout } from './useLogout';

const MOCK_USER = { id: 'user-1', email: 'test@example.com', role: 'USER' as const };

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
}

beforeEach(() => {
  useAuthStore.setState({ user: MOCK_USER, accessToken: 'token-abc' });
});

describe('useLogout', () => {
  it('clears auth store on successful logout', async () => {
    server.use(
      http.post('http://localhost:3001/api/auth/logout', () =>
        new HttpResponse(null, { status: 204 }),
      ),
    );

    const { result } = renderHook(() => useLogout(), { wrapper: createWrapper() });

    act(() => {
      result.current.mutate();
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const { user, accessToken } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(accessToken).toBeNull();
  });
});
