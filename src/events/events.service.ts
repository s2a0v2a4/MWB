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
      date: '2024-07-15',  // ✅ date in allen Events verfügbar
      participants: 8,
      latitude: 50.9866,
      longitude: 12.9716
    }
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
      id: this.nextId++,
      ...createEventDto,  // ✅ date wird automatisch aus DTO übernommen
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
