import { Injectable } from '@nestjs/common';
import { EventDto } from './interfaces/event.interface';  // ✅ EventDto Import
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  private events: EventDto[] = [  // ✅ Vollständige EventDto Objekte
    {
      id: 1,
      title: 'Fußball im Stadtpark',
      description: 'Lockeres Fußballspiel für alle Level. Bringt eigene Getränke mit!',
      category: 'Sport',
      type: 'Football',
      time: '18:00',
      participants: 8,
      latitude: 50.9866,
      longitude: 12.9716,
    },
    {
      id: 2,
      title: 'Jazz Jam Session',
      description: 'Offene Jazz Session im Kulturzentrum. Instrumente vorhanden.',
      category: 'Musik',
      type: 'Concert',
      time: '20:00',
      participants: 12,
      latitude: 50.9856,
      longitude: 12.9726,
    },
    {
      id: 3,
      title: 'Kunstausstellung',
      description: 'Lokale Künstler stellen ihre Werke aus. Eintritt frei!',
      category: 'Kunst',
      type: 'Exhibition',
      time: '16:00',
      participants: 25,
      latitude: 50.9876,
      longitude: 12.9706,
    },
    {
      id: 4,
      title: 'Volleyball am See',
      description: 'Beach-Volleyball am Schwanenteich. Für Anfänger und Profis.',
      category: 'Sport',
      type: 'Volleyball',
      time: '15:30',
      participants: 6,
      latitude: 50.9846,
      longitude: 12.9736,
    },
    {
      id: 5,
      title: 'Konzert im Park',
      description: 'Live-Musik verschiedener Bands. Picknick erwünscht!',
      category: 'Musik',
      type: 'Concert',
      time: '19:00',
      participants: 45,
      latitude: 50.9886,
      longitude: 12.9696,
    },
    {
      id: 8,
      title: 'Test Event',
      description: 'Test Description',
      category: 'Sport',
      time: '14:00',
      type: 'Test',
      participants: 4,  // ✅ Korrekt übernommen!
      latitude: 50.9866,
      longitude: 12.9716,
    }
  ];

  private nextId = 6;

  findAll(): EventDto[] {
    return this.events;
  }

  findByCategories(categories: string[]): EventDto[] {
    return this.events.filter(event => categories.includes(event.category));
  }

  create(createEventDto: CreateEventDto): EventDto {
    const newEvent: EventDto = {
      id: this.nextId++,
      ...createEventDto,
      // ✅ participants nur setzen wenn nicht im DTO vorhanden
      participants: createEventDto.participants ?? 0,
    };

    this.events.push(newEvent);
    return newEvent;
  }

  join(id: number): EventDto {
    const event = this.events.find(e => e.id === id);
    if (!event) {
      throw new Error(`Event with id ${id} not found`);
    }

    event.participants += 1;
    return event;
  }

  remove(id: number): { message: string } {
    const index = this.events.findIndex(e => e.id === id);
    if (index === -1) {
      throw new Error(`Event with id ${id} not found`);
    }

    this.events.splice(index, 1);
    return { message: `Event with id ${id} deleted successfully` };
  }
}
