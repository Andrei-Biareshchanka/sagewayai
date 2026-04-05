import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

import { HomePage } from './HomePage';

function renderWithProviders(ui: React.ReactElement) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('HomePage', () => {
  it('shows loading state initially', () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders daily parable title after load', async () => {
    renderWithProviders(<HomePage />);
    // DailyParableCard renders the title in an h2
    expect(await screen.findByRole('heading', { level: 2, name: 'The Empty Cup' })).toBeInTheDocument();
  });

  it('renders "More parables" section', async () => {
    renderWithProviders(<HomePage />);
    expect(await screen.findByRole('heading', { name: 'More parables' })).toBeInTheDocument();
  });

  it('renders category pills from API', async () => {
    renderWithProviders(<HomePage />);
    // HeroSection renders categories as buttons
    expect(await screen.findByRole('button', { name: 'Wisdom' })).toBeInTheDocument();
  });

  it('renders "Parable of the day" badge', async () => {
    renderWithProviders(<HomePage />);
    expect(await screen.findByText('Parable of the day')).toBeInTheDocument();
  });
});
