import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Entity } from '../types';
import L from 'leaflet';
import { X } from 'lucide-react';

// Fix issue icon Leaflet di React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const entities: Entity[] = [
  { id: '1', name: 'Sensor Suhu Gedung A', type: 'IoT Device', latitude: -6.200000, longitude: 106.816666, status: 'active' },
  { id: '2', name: 'Kendaraan Operasional B', type: 'Vehicle', latitude: -6.210000, longitude: 106.820000, status: 'inactive' },
];

export default function EntityMap() {
  // State untuk menyimpan entitas yang sedang dipilih/diklik
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Peta Persebaran Entitas</h1>
        <p className="text-gray-400">Pemantauan lokasi geografis secara real-time. Klik pin untuk melihat detail.</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden h-[600px] z-0 relative">
        <MapContainer 
          center={[-6.200000, 106.816666]} 
          zoom={13} 
          scrollWheelZoom={true} 
          style={{ height: '100%', width: '100%', zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className="map-tiles-dark"
          />
          
          {entities.map(entity => (
            <Marker 
              key={entity.id} 
              position={[entity.latitude, entity.longitude]}
              eventHandlers={{
                // Menampilkan modal saat marker atau tooltip diklik
                click: () => setSelectedEntity(entity)
              }}
            >
              <Tooltip 
                permanent 
                direction="top" 
                offset={[0, -20]}
                // Memberikan class dinamis berdasarkan status
                className={entity.status === 'active' ? 'map-tooltip-active' : 'map-tooltip-inactive'}
              >
                <span className="font-semibold text-sm cursor-pointer">{entity.name}</span>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Modal Detail Entitas */}
      {selectedEntity && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-md p-6 relative shadow-2xl">
            <button 
              onClick={() => setSelectedEntity(null)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-xl font-semibold mb-6 text-white border-b border-gray-800 pb-3">Detail Entitas</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Nama Entitas</p>
                <p className="text-base font-medium text-gray-200">{selectedEntity.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Tipe Perangkat</p>
                <p className="text-base font-medium text-gray-200">{selectedEntity.type}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Latitude</p>
                  <p className="text-base font-medium text-gray-200 font-mono">{selectedEntity.latitude}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Longitude</p>
                  <p className="text-base font-medium text-gray-200 font-mono">{selectedEntity.longitude}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">Status Operasional</p>
                <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${
                  selectedEntity.status === 'active' 
                    ? 'bg-primary/20 text-primary border border-primary/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {selectedEntity.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}