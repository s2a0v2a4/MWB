import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './interfaces/event.interface';

@Injectable()
export class EventsService {
  private events: Event[] = [
    // Beispiel-Events zum Testen
    {
      id: 1,
      title: 'Fußball im Stadtpark',
      description:
        'Lockeres Fußballspiel für alle Level. Bringt eigene Getränke mit!',
      category: 'Sport',
      time: '18:00',
      participants: 8,
    },
    {
      id: 2,
      title: 'Jazz Jam Session',
      description:
        'Offene Jazz Session im Kulturzentrum. Instrumente vorhanden.',
      category: 'Musik',
      time: '20:00',
      participants: 12,
    },
    {
      id: 3,
      title: 'Aquarell Workshop',
      description: 'Lerne Aquarell-Techniken in entspannter Atmosphäre.',
      category: 'Kunst',
      time: '14:00',
      participants: 6,
    },
    {
      id: 4,
      title: 'Basketball Training',
      description:
        'Training für Anfänger und Fortgeschrittene in der Sporthalle.',
      category: 'Sport',
      time: '19:30',
      participants: 10,
    },
    {
      id: 5,
      title: 'Konzert im Park',
      description:
        'Klassik-Konzert unter freiem Himmel mit lokalen Musikern.',
      category: 'Musik',
      time: '16:00',
      participants: 45,
    },
  ];
  private idCounter = 6; // Start nach den Beispiel-Events

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
      id: this.idCounter++,
      participants: 0,
      ...createEventDto,
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
