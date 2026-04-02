import { Routes, Route } from 'react-router-dom';
import { Navbar } from '@/layout/Navbar';
import { HomePage } from '@/home/HomePage';

function App() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export { App };
export default App;
