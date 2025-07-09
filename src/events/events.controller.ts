// import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
// import { EventsService } from './events.service';
// import { CreateEventDto } from './dto/create-event.dto';

// @Controller('api/events')
// export class EventsController {
//   constructor(private readonly eventsService: EventsService) {}

//   @Get()
//   findAll() {
//     return this.eventsService.findAll();
//   }

//   @Post()
//   create(@Body() createEventDto: CreateEventDto) {
//     return this.eventsService.create(createEventDto);
//   }

//   @Post(':id/join')
//   join(@Param('id', ParseIntPipe) id: number) {
//     return this.eventsService.join(id);
//   }
// }


import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Post(':id/join')
  join(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.join(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.remove(id);
  }
}
