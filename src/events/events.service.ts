import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  private events = [];
  private idCounter = 1;

  findAll() {
    return this.events;
  }

  create(createEventDto: CreateEventDto) {
    const newEvent = {
      id: this.idCounter++,
      ...createEventDto,
      participants: 0,
    };
    this.events.push(newEvent);
    return newEvent;
  }

  joinEvent(id: number) {
    const event = this.events.find(ev => ev.id === id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    event.participants++;
    return event;
  }
}
