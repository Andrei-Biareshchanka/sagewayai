import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { useAuthStore } from './authStore';
import { ProtectedRoute } from './ProtectedRoute';

const MOCK_USER = { id: 'user-1', email: 'test@example.com', role: 'USER' as const };

function renderWithRouter(initialPath = '/protected') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <div>Protected content</div>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<div>Login page</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  useAuthStore.setState({ user: null, accessToken: null });
});

describe('ProtectedRoute', () => {
  it('renders children when user is authenticated', () => {
    useAuthStore.setState({ user: MOCK_USER, accessToken: 'token' });
    renderWithRouter();
    expect(screen.getByText('Protected content')).toBeInTheDocument();
  });

  it('redirects to /login when user is not authenticated', () => {
    renderWithRouter();
    expect(screen.getByText('Login page')).toBeInTheDocument();
    expect(screen.queryByText('Protected content')).not.toBeInTheDocument();
  });
});
