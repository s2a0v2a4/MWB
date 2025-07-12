export interface Event {
  id: number;
  title: string;
  description: string;
  category: string;
  time: string;
  participants: number;
  type?: string;
  latitude?: number;  // ➕ Neu hinzugefügt
  longitude?: number; // ➕ Neu hinzugefügt
}
