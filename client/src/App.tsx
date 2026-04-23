import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAuthStore } from '@/modules/auth';
import { ProtectedRoute } from '@/modules/auth';
import { refreshSession } from '@/modules/auth';
import { Footer } from '@/layout/Footer';
import { Navbar } from '@/layout/Navbar';
import { ScrollToTop } from '@/layout/ScrollToTop';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';

const HomePage = lazy(() =>
  import('@/pages/HomePage').then((m) => ({ default: m.HomePage })),
);
const ExplorePage = lazy(() =>
  import('@/pages/ExplorePage').then((m) => ({ default: m.ExplorePage })),
);
const ParableReaderPage = lazy(() =>
  import('@/pages/ParableReaderPage').then((m) => ({ default: m.ParableReaderPage })),
);
const LoginPage = lazy(() =>
  import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage })),
);
const RegisterPage = lazy(() =>
  import('@/pages/RegisterPage').then((m) => ({ default: m.RegisterPage })),
);
const CollectionPage = lazy(() =>
  import('@/pages/CollectionPage').then((m) => ({ default: m.CollectionPage })),
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
      <ScrollToTop />
      <Navbar />
      <div className="flex-1">
        <ErrorBoundary>
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
        </ErrorBoundary>
      </div>
      <Footer />
    </div>
  );
}

export { App };
export default App;
