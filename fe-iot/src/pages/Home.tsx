import { Map, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-white">IOT Entity Tracker</h1>
        <p className="text-gray-400 max-w-lg mx-auto">
          Sistem pemantauan dan manajemen entitas geografis. Pilih menu di bawah untuk mulai mengelola data atau melihat persebaran lokasi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Link to="/crud" className="group block h-full">
          <div className="bg-gray-900/50 border border-gray-800 hover:border-primary rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(0,174,151,0.3)] h-full flex flex-col items-center text-center cursor-pointer">
            <div className="bg-primary/10 p-4 rounded-full mb-6 group-hover:bg-primary/20 transition-colors">
              <Database size={48} className="text-primary" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-white">Manajemen Data</h2>
            <p className="text-gray-400">
              Kelola data entitas menggunakan tabel (CRUD). Tambah, ubah, atau hapus informasi perangkat dan koordinat.
            </p>
          </div>
        </Link>

        <Link to="/map" className="group block h-full">
          <div className="bg-gray-900/50 border border-gray-800 hover:border-primary rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(0,174,151,0.3)] h-full flex flex-col items-center text-center cursor-pointer">
            <div className="bg-primary/10 p-4 rounded-full mb-6 group-hover:bg-primary/20 transition-colors">
              <Map size={48} className="text-primary" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-white">Peta Lokasi</h2>
            <p className="text-gray-400">
              Visualisasikan letak entitas pada peta interaktif berdasarkan titik koordinat geografis.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}