import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import axios from 'axios';
import type { Entity } from '../types';

const API_URL = 'http://localhost:8080/api/entities/';

export default function EntityCRUD() {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Entity>>({});

  // Mengambil data dari Backend
  const fetchEntities = async () => {
    try {
      const response = await axios.get(API_URL);
      setEntities(response.data || []);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  useEffect(() => {
    fetchEntities();
  }, []);

  const handleOpenModal = (entity?: Entity) => {
    if (entity && entity.id) {
      setFormData(entity);
      setEditingId(entity.id);
    } else {
      setFormData({ status: 'active' });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        // PUT: Update data
        await axios.put(`${API_URL}/${editingId}`, formData);
      } else {
        // POST: Tambah data baru
        await axios.post(`${API_URL}/`, formData);
      }
      setIsModalOpen(false);
      fetchEntities(); // Refresh data setelah simpan
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;
    
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchEntities(); // Refresh data setelah hapus
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Manajemen Entitas</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-[#008f7b] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={18} /> Tambah Data
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="p-4 text-gray-300 font-semibold border-b border-gray-700 w-16">ID</th>
              <th className="p-4 text-gray-300 font-semibold border-b border-gray-700">Nama Entitas</th>
              <th className="p-4 text-gray-300 font-semibold border-b border-gray-700">Tipe</th>
              <th className="p-4 text-gray-300 font-semibold border-b border-gray-700">Koordinat</th>
              <th className="p-4 text-gray-300 font-semibold border-b border-gray-700">Status</th>
              <th className="p-4 text-gray-300 font-semibold border-b border-gray-700 w-24">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {entities.map(entity => (
              <tr key={entity.id} className="hover:bg-gray-800/30 transition-colors">
                <td className="p-4 border-b border-gray-800 text-gray-400">{entity.id}</td>
                <td className="p-4 border-b border-gray-800">{entity.name}</td>
                <td className="p-4 border-b border-gray-800">{entity.type}</td>
                <td className="p-4 border-b border-gray-800 text-gray-400 text-sm">
                  {entity.latitude}, {entity.longitude}
                </td>
                <td className="p-4 border-b border-gray-800">
                  <span className={`px-2 py-1 rounded-full text-xs ${entity.status === 'active' ? 'bg-primary/20 text-primary' : 'bg-red-500/20 text-red-400'}`}>
                    {entity.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 border-b border-gray-800 flex gap-3">
                  <button onClick={() => handleOpenModal(entity)} className="text-gray-400 hover:text-white transition-colors">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => entity.id && handleDelete(entity.id)} className="text-gray-400 hover:text-red-400 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {entities.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">Belum ada data entitas.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-md p-6 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">{editingId ? 'Edit Entitas' : 'Tambah Entitas'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Nama Entitas</label>
                <input 
                  type="text" 
                  value={formData.name || ''}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Tipe</label>
                <input 
                  type="text" 
                  value={formData.type || ''}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Latitude</label>
                  <input 
                    type="number" 
                    value={formData.latitude || ''}
                    onChange={e => setFormData({...formData, latitude: parseFloat(e.target.value)})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Longitude</label>
                  <input 
                    type="number" 
                    value={formData.longitude || ''}
                    onChange={e => setFormData({...formData, longitude: parseFloat(e.target.value)})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Status</label>
                <select 
                  value={formData.status || 'active'}
                  onChange={e => setFormData({...formData, status: e.target.value as 'active' | 'inactive'})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
                Batal
              </button>
              <button onClick={handleSave} className="bg-primary hover:bg-[#008f7b] text-white px-4 py-2 rounded-lg transition-colors">
                Simpan Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}