import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';

import { server } from '@/test/setup';
import { useAuthStore } from '@/modules/auth/authStore';
import { MOCK_PARABLE, MOCK_PARABLES_RESPONSE } from '@/test/handlers';
import { CollectionPage } from './CollectionPage';

const MOCK_USER = { id: 'user-1', email: 'test@example.com', role: 'USER' as const };

function renderWithProviders(ui: React.ReactElement) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  useAuthStore.setState({ user: MOCK_USER, accessToken: 'token' });
});

describe('CollectionPage', () => {
  it('shows skeleton loaders while fetching', () => {
    server.use(
      http.get('http://localhost:3001/api/me/favorites', async () => {
        await new Promise((r) => setTimeout(r, 50));
        return HttpResponse.json(MOCK_PARABLES_RESPONSE);
      }),
    );

    renderWithProviders(<CollectionPage />);
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders "My collection" heading', async () => {
    server.use(
      http.get('http://localhost:3001/api/me/favorites', () =>
        HttpResponse.json(MOCK_PARABLES_RESPONSE),
      ),
    );

    renderWithProviders(<CollectionPage />);
    expect(await screen.findByRole('heading', { name: 'My collection' })).toBeInTheDocument();
  });

  it('shows empty state with explore link when no favorites', async () => {
    server.use(
      http.get('http://localhost:3001/api/me/favorites', () =>
        HttpResponse.json({ data: [], page: 1, limit: 20, total: 0 }),
      ),
    );

    renderWithProviders(<CollectionPage />);

    expect(await screen.findByText('No favorites yet.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /explore parables/i })).toBeInTheDocument();
  });

  it('renders parable cards after loading', async () => {
    server.use(
      http.get('http://localhost:3001/api/me/favorites', () =>
        HttpResponse.json(MOCK_PARABLES_RESPONSE),
      ),
      http.get('http://localhost:3001/api/categories', () => HttpResponse.json([])),
    );

    renderWithProviders(<CollectionPage />);

    expect(await screen.findByText(MOCK_PARABLE.title)).toBeInTheDocument();
  });
});
