export interface Entity {
  id: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'inactive';
}