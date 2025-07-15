export class EventDto {
  id: number;
  title: string;
  description: string;
  category: string;
  type: string;
  time: string;
  date: string; // Neues Feld hinzugefügt
  participants: number;
  latitude: number;
  longitude: number;
}

export class CreateEventDto {
  name: string;
  type: string;
  participants: number;
  time: string;
  date: string; // Neues Pflichtfeld
  position: [number, number]; // [latitude, longitude]
}