import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { createElement } from 'react';

import { server } from '@/test/setup';
import { useToggleFavorite } from './useToggleFavorite';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
}

describe('useToggleFavorite', () => {
  it('calls POST endpoint when not yet favorited', async () => {
    let method = '';
    server.use(
      http.post('http://localhost:3001/api/me/favorites/parable-1', ({ request }) => {
        method = request.method;
        return new HttpResponse(null, { status: 201 });
      }),
    );

    const { result } = renderHook(() => useToggleFavorite('parable-1', false), {
      wrapper: createWrapper(),
    });

    act(() => { result.current.mutate(); });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(method).toBe('POST');
  });

  it('calls DELETE endpoint when already favorited', async () => {
    let method = '';
    server.use(
      http.delete('http://localhost:3001/api/me/favorites/parable-1', ({ request }) => {
        method = request.method;
        return new HttpResponse(null, { status: 204 });
      }),
    );

    const { result } = renderHook(() => useToggleFavorite('parable-1', true), {
      wrapper: createWrapper(),
    });

    act(() => { result.current.mutate(); });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(method).toBe('DELETE');
  });
});
