import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';

import { server } from '@/test/setup';
import { SubscribeForm } from './SubscribeForm';

function renderForm() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <SubscribeForm />
    </QueryClientProvider>,
  );
}

describe('SubscribeForm', () => {
  it('renders EN and RU language buttons', () => {
    renderForm();
    expect(screen.getByRole('button', { name: 'English' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Russian' })).toBeInTheDocument();
  });

  it('defaults to English language selection', () => {
    renderForm();
    const enBtn = screen.getByRole('button', { name: 'English' });
    expect(enBtn.className).toContain('bg-sage');
  });

  it('switches active language when RU is clicked', () => {
    renderForm();
    const ruBtn = screen.getByRole('button', { name: 'Russian' });
    fireEvent.click(ruBtn);
    expect(ruBtn.className).toContain('bg-sage');
    expect(screen.getByRole('button', { name: 'English' }).className).not.toContain('bg-sage');
  });

  it('sends selected lang in subscription request', async () => {
    let capturedBody: unknown;
    server.use(
      http.post('http://localhost:3001/api/subscribe', async ({ request }) => {
        capturedBody = await request.json();
        return HttpResponse.json({ message: 'Subscribed successfully' }, { status: 201 });
      }),
    );

    renderForm();
    fireEvent.click(screen.getByRole('button', { name: 'Russian' }));
    fireEvent.change(screen.getByPlaceholderText('your@email.com'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));

    await waitFor(() => {
      expect(capturedBody).toMatchObject({ email: 'user@example.com', lang: 'ru' });
    });
  });

  it('shows success state after subscribing', async () => {
    server.use(
      http.post('http://localhost:3001/api/subscribe', () =>
        HttpResponse.json({ message: 'Subscribed successfully' }, { status: 201 }),
      ),
    );

    renderForm();
    fireEvent.change(screen.getByPlaceholderText('your@email.com'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));

    expect(await screen.findByText("You're subscribed!")).toBeInTheDocument();
  });
});
