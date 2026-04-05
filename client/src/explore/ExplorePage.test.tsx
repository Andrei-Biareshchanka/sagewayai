import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';

import { server } from '@/test/setup';
import { ExplorePage } from './ExplorePage';
import { MOCK_PARABLE, MOCK_PARABLES_RESPONSE } from '@/test/handlers';

function renderWithProviders(ui: React.ReactElement) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('ExplorePage', () => {
  it('renders "Explore parables" heading', async () => {
    renderWithProviders(<ExplorePage />);
    expect(await screen.findByRole('heading', { name: 'Explore parables' })).toBeInTheDocument();
  });

  it('shows "All" pill by default', async () => {
    renderWithProviders(<ExplorePage />);
    const allPill = await screen.findByRole('button', { name: 'All' });
    expect(allPill).toBeInTheDocument();
  });

  it('shows loading state while fetching', () => {
    renderWithProviders(<ExplorePage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders parables grid after load', async () => {
    renderWithProviders(<ExplorePage />);
    expect(await screen.findByText('The Empty Cup')).toBeInTheDocument();
  });

  it('clicking a category pill filters the list', async () => {
    const filteredParable = { ...MOCK_PARABLE, id: 'filtered-1', title: 'The Filtered Parable' };

    server.use(
      http.get('http://localhost:3001/api/parables', ({ request }) => {
        const url = new URL(request.url);
        if (url.searchParams.get('category') === 'wisdom') {
          return HttpResponse.json({ ...MOCK_PARABLES_RESPONSE, data: [filteredParable] });
        }
        return HttpResponse.json(MOCK_PARABLES_RESPONSE);
      }),
    );

    renderWithProviders(<ExplorePage />);

    const wisdomPill = await screen.findByRole('button', { name: 'Wisdom' });
    fireEvent.click(wisdomPill);

    await waitFor(() => {
      expect(screen.getByText('The Filtered Parable')).toBeInTheDocument();
    });
  });

  it('does not show pagination when only 1 page', async () => {
    renderWithProviders(<ExplorePage />);
    await screen.findByText('The Empty Cup');
    expect(screen.queryByRole('button', { name: /previous/i })).not.toBeInTheDocument();
  });

  it('shows pagination when multiple pages exist', async () => {
    server.use(
      http.get('http://localhost:3001/api/parables', () =>
        HttpResponse.json({ ...MOCK_PARABLES_RESPONSE, total: 50, limit: 20 }),
      ),
    );

    renderWithProviders(<ExplorePage />);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
    });
  });
});
