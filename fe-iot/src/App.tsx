import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import EntityCRUD from './pages/EntityCRUD';
import EntityMap from './pages/EntityMap';
import { Home as HomeIcon } from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background font-sans">
        {/* Simple Navbar */}
        <nav className="bg-gray-900/80 backdrop-blur-md border-b border-[#00ae97]/20 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl hover:text-primary transition-colors">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white">
                <HomeIcon size={18} />
              </div>
              IoT Tracker
            </Link>
            <div className="flex gap-6">
              <Link to="/crud" className="text-gray-300 hover:text-primary transition-colors text-sm font-medium">Data</Link>
              <Link to="/map" className="text-gray-300 hover:text-primary transition-colors text-sm font-medium">Peta</Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crud" element={<EntityCRUD />} />
            <Route path="/map" element={<EntityMap />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;