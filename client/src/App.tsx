import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAuthStore } from '@/auth/authStore';
import { ProtectedRoute } from '@/auth/ProtectedRoute';
import { refreshSession } from '@/auth/authApi';
import { Footer } from '@/layout/Footer';
import { Navbar } from '@/layout/Navbar';
import { HomePage } from '@/home/HomePage';

const ExplorePage = lazy(() =>
  import('@/explore/ExplorePage').then((m) => ({ default: m.ExplorePage })),
);
const ParableReaderPage = lazy(() =>
  import('@/reader/ParableReaderPage').then((m) => ({ default: m.ParableReaderPage })),
);
const LoginPage = lazy(() =>
  import('@/auth/LoginPage').then((m) => ({ default: m.LoginPage })),
);
const RegisterPage = lazy(() =>
  import('@/auth/RegisterPage').then((m) => ({ default: m.RegisterPage })),
);
const CollectionPage = lazy(() =>
  import('@/collection/CollectionPage').then((m) => ({ default: m.CollectionPage })),
);

function App() {
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    refreshSession()
      .then(({ user, accessToken }) => setAuth(user, accessToken))
      .catch(() => {
        // No valid session — stay logged out
      });
  }, [setAuth]);

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Navbar />
      <div className="flex-1">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/parables/:id" element={<ParableReaderPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/collection"
              element={
                <ProtectedRoute>
                  <CollectionPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export { App };
export default App;
