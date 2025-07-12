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


import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events') // ❗️ kein doppeltes 'api' mehr!
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll(@Query('categories') categories?: string) {
    if (categories) {
      const categoryList = categories.split(',');
      return this.eventsService.findByCategories(categoryList);
    }
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
