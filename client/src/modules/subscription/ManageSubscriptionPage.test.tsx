import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { http, HttpResponse } from 'msw';

import { server } from '@/test/setup';
import { ManageSubscriptionPage } from './ManageSubscriptionPage';

const MOCK_SUBSCRIBER = { email: 'user@example.com', lang: 'en', active: true };

function renderPage(token = 'valid-token') {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[`/subscription/manage?token=${token}`]}>
        <Routes>
          <Route path="/subscription/manage" element={<ManageSubscriptionPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('ManageSubscriptionPage', () => {
  it('shows invalid link message when token is missing', () => {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    render(
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={['/subscription/manage']}>
          <Routes>
            <Route path="/subscription/manage" element={<ManageSubscriptionPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );
    expect(screen.getByText(/invalid or has expired/i)).toBeInTheDocument();
  });

  it('shows invalid link message when token is not found', async () => {
    server.use(
      http.get('http://localhost:3001/api/subscribe/manage/:token', () =>
        HttpResponse.json({ error: 'Invalid manage link.' }, { status: 404 }),
      ),
    );

    renderPage('bad-token');

    await waitFor(() => {
      expect(screen.getByText(/invalid or has expired/i)).toBeInTheDocument();
    });
  });

  it('shows subscriber email and current language', async () => {
    server.use(
      http.get('http://localhost:3001/api/subscribe/manage/:token', () =>
        HttpResponse.json(MOCK_SUBSCRIBER),
      ),
    );

    renderPage();

    expect(await screen.findByText('user@example.com')).toBeInTheDocument();
    const enBtn = await screen.findByRole('button', { name: 'English' });
    expect(enBtn.className).toContain('bg-sage');
  });

  it('updates active button when language is switched', async () => {
    server.use(
      http.get('http://localhost:3001/api/subscribe/manage/:token', () =>
        HttpResponse.json(MOCK_SUBSCRIBER),
      ),
    );

    renderPage();
    await screen.findByText('user@example.com');

    fireEvent.click(screen.getByRole('button', { name: 'Russian' }));
    expect(screen.getByRole('button', { name: 'Russian' }).className).toContain('bg-sage');
  });

  it('saves language preference on save click', async () => {
    let patchCalled = false;
    server.use(
      http.get('http://localhost:3001/api/subscribe/manage/:token', () =>
        HttpResponse.json(MOCK_SUBSCRIBER),
      ),
      http.patch('http://localhost:3001/api/subscribe/manage/:token', async () => {
        patchCalled = true;
        return HttpResponse.json({ message: 'Language updated' });
      }),
    );

    renderPage();
    await screen.findByText('user@example.com');
    fireEvent.click(screen.getByRole('button', { name: 'Russian' }));
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => expect(patchCalled).toBe(true));
    expect(await screen.findByText('Saved!')).toBeInTheDocument();
  });

  it('shows unsubscribe confirmation dialog on click', async () => {
    server.use(
      http.get('http://localhost:3001/api/subscribe/manage/:token', () =>
        HttpResponse.json(MOCK_SUBSCRIBER),
      ),
    );

    renderPage();
    await screen.findByText('user@example.com');
    fireEvent.click(screen.getByRole('button', { name: 'Unsubscribe' }));

    expect(screen.getByText(/Are you sure/i)).toBeInTheDocument();
  });

  it('shows unsubscribed state after confirming', async () => {
    server.use(
      http.get('http://localhost:3001/api/subscribe/manage/:token', () =>
        HttpResponse.json(MOCK_SUBSCRIBER),
      ),
      http.get('http://localhost:3001/api/subscribe/unsubscribe/:token', () =>
        new HttpResponse('<html>unsubscribed</html>', { status: 200, headers: { 'Content-Type': 'text/html' } }),
      ),
    );

    renderPage();
    await screen.findByText('user@example.com');
    fireEvent.click(screen.getByRole('button', { name: 'Unsubscribe' }));
    const confirmBtns = screen.getAllByRole('button', { name: 'Unsubscribe' });
    fireEvent.click(confirmBtns[confirmBtns.length - 1]);

    expect(await screen.findByText("You've been unsubscribed.")).toBeInTheDocument();
  });
});
