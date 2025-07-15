import { Injectable } from '@nestjs/common';
import { EventDto } from './interfaces/event.interface';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  private events: EventDto[] = [
    {
      id: 1,
      title: 'Fußball im Stadtpark',
      description: 'Lockeres Fußballspiel für alle Level. Bringt eigene Getränke mit!',
      category: 'Sport',
      type: 'Football',
      time: '18:00',
      date: '2025-07-15', // Hinzugefügt
      participants: 8,
      latitude: 50.9866,
      longitude: 12.9716,
    },
    {
      id: 2,
      title: 'Jazz Konzert',
      description: 'Live Jazz Musik im Park. Entspannte Atmosphäre für alle Musikliebhaber.',
      category: 'Musik',
      type: 'Concert',
      time: '20:00',
      date: '2025-07-16', // Hinzugefügt
      participants: 25,
      latitude: 50.9876,
      longitude: 12.9726,
    },
    // Weitere Events entsprechend aktualisieren...
  ];

  private nextId = 2;

  findAll(): EventDto[] {
    return this.events;
  }

  findByCategories(categories: string[]): EventDto[] {
    return this.events.filter(event => categories.includes(event.category));
  }

  create(createEventDto: CreateEventDto): EventDto {
    const newEvent: EventDto = {
      id: ++this.nextId,
      title: createEventDto.name,
      description: `${createEventDto.type} Event`,
      category: this.mapTypeToCategory(createEventDto.type),
      type: createEventDto.type,
      time: createEventDto.time,
      date: createEventDto.date, // Neues Feld hinzugefügt
      participants: createEventDto.participants,
      latitude: createEventDto.position[0],
      longitude: createEventDto.position[1],
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
