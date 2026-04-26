import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { createElement } from 'react';

import { server } from '@/test/setup';
import { useAuthStore } from '@/modules/auth/authStore';
import { MOCK_PARABLE, MOCK_PARABLES_RESPONSE } from '@/test/handlers';
import { useFavorites } from './useFavorites';

const MOCK_USER = { id: 'user-1', email: 'test@example.com', role: 'USER' as const };

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
}

beforeEach(() => {
  useAuthStore.setState({ user: null, accessToken: null });
});

describe('useFavorites', () => {
  it('does not fetch when user is not authenticated', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper: createWrapper() });
    expect(result.current.fetchStatus).toBe('idle');
    expect(result.current.data).toBeUndefined();
  });

  it('fetches favorites when user is authenticated', async () => {
    useAuthStore.setState({ user: MOCK_USER, accessToken: 'token' });

    server.use(
      http.get('http://localhost:3001/api/me/favorites', () =>
        HttpResponse.json(MOCK_PARABLES_RESPONSE),
      ),
    );

    const { result } = renderHook(() => useFavorites(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.data).toHaveLength(1);
    expect(result.current.data?.data[0]).toMatchObject({ id: MOCK_PARABLE.id });
  });

  it('returns empty data array when no favorites exist', async () => {
    useAuthStore.setState({ user: MOCK_USER, accessToken: 'token' });

    server.use(
      http.get('http://localhost:3001/api/me/favorites', () =>
        HttpResponse.json({ data: [], page: 1, limit: 20, total: 0 }),
      ),
    );

    const { result } = renderHook(() => useFavorites(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.data).toHaveLength(0);
  });
});
