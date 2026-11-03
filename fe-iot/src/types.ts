export interface Entity {
  id?: number; // Ubah ke number dan jadikan opsional
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'inactive';
}