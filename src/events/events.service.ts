// import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateEventDto } from './dto/create-event.dto';
// import { Event } from './event.interface';


// @Injectable()
// export class EventsService {
//   private events: Event[] = [];
//   private idCounter = 1;


//   findAll(): Event[] {
//     return this.events;
//   }

//   create(createEventDto: CreateEventDto): Event {
//     const newEvent: Event = {
//       id: this.idCounter++,
//       ...createEventDto,
//       participants: 0,
//     };
//     this.events.push(newEvent);
//     return newEvent;
//   }

//   join(id: number): Event { 
//     const event = this.events.find(ev => ev.id === id);
//     if (!event) {
//       throw new NotFoundException('Event not found');
//     }
//     event.participants++;
//     return event;
//   }
// }



import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './interfaces/event.interface';

@Injectable()
export class EventsService {
  private events: Event[] = [];
  private idCounter = 1;

  findAll(): Event[] {
    return this.events;
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

  joinEvent(id: number): Event {
    const event = this.events.find(ev => ev.id === id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    event.participants += 1;
    return event;
  }

  remove(id: string): { message: string } {
    const index = this.events.findIndex(e => e.id === id);
    if (index === -1) {
      throw new NotFoundException('Event not found');
    }
    this.events.splice(index, 1);
    return { message: 'Event deleted' };
  }
}
