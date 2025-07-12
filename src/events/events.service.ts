import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './interfaces/event.interface';

@Injectable()
export class EventsService {
  private events: Event[] = [
    {
      id: 1,
      title: 'Fußball im Stadtpark',
      description: 'Lockeres Fußballspiel für alle Level. Bringt eigene Getränke mit!',
      category: 'Sport',
      time: '18:00',
      participants: 8,
      type: 'Football',
      latitude: 50.9866,    // ➕ Mittweida Koordinaten
      longitude: 12.9716,   // ➕ Mittweida Koordinaten
    },
    {
      id: 2,
      title: 'Jazz Jam Session',
      description: 'Offene Jazz Session im Kulturzentrum. Instrumente vorhanden.',
      category: 'Musik',
      time: '20:00',
      participants: 12,
      type: 'Music',
      latitude: 50.9856,    // ➕ Kulturzentrum Mittweida
      longitude: 12.9726,   // ➕ Kulturzentrum Mittweida
    },
    {
      id: 3,
      title: 'Kunstausstellung',
      description: 'Lokale Künstler stellen ihre Werke aus. Eintritt frei!',
      category: 'Kunst',
      time: '16:00',
      participants: 25,
      type: 'Exhibition',
      latitude: 50.9876,    // ➕ Galerie Mittweida
      longitude: 12.9706,   // ➕ Galerie Mittweida
    },
    {
      id: 4,
      title: 'Volleyball am See',
      description: 'Beach-Volleyball am Schwanenteich. Für Anfänger und Profis.',
      category: 'Sport',
      time: '15:30',
      participants: 6,
      type: 'Volleyball',
      latitude: 50.9846,    // ➕ Schwanenteich
      longitude: 12.9736,   // ➕ Schwanenteich
    },
    {
      id: 5,
      title: 'Konzert im Park',
      description: 'Live-Musik verschiedener Bands. Picknick erwünscht!',
      category: 'Musik',
      time: '19:00',
      participants: 45,
      type: 'Concert',
      latitude: 50.9886,    // ➕ Stadtpark
      longitude: 12.9696,   // ➕ Stadtpark
    },
  ];

  private nextId = 6;

  findAll(): Event[] {
    return this.events;
  }

  findByCategories(categories: string[]): Event[] {
    // Filter Events nach Kategorien
    return this.events.filter(event =>
      categories.includes(event.category),
    );
  }

  create(createEventDto: CreateEventDto): Event {
    const newEvent: Event = {
      id: this.nextId++,
      ...createEventDto,
      participants: 0, // Neue Events starten mit 0 Teilnehmern
      // latitude und longitude werden aus dem DTO übernommen (falls vorhanden)
    };

    this.events.push(newEvent);
    return newEvent;
  }

  join(id: number): Event {
    const event = this.events.find(ev => ev.id === id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    event.participants += 1;
    return event;
  }

  remove(id: number): { message: string } {
    const index = this.events.findIndex(e => e.id === id);
    if (index === -1) {
      throw new NotFoundException('Event not found');
    }
    this.events.splice(index, 1);
    return { message: 'Event deleted' };
  }
}
