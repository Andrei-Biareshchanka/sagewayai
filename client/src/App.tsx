import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Navbar } from '@/layout/Navbar';
import { HomePage } from '@/home/HomePage';

const ExplorePage = lazy(() =>
  import('@/explore/ExplorePage').then((m) => ({ default: m.ExplorePage })),
);
const ParableReaderPage = lazy(() =>
  import('@/reader/ParableReaderPage').then((m) => ({ default: m.ParableReaderPage })),
);

function App() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Navbar />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/parables/:id" element={<ParableReaderPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export { App };
export default App;
