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


import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Query, BadRequestException, Logger } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { EventDto } from './interfaces/event.interface';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll(@Query('categories') categories?: string): EventDto[] {
    if (categories) {
      const categoryList = categories.split(',');
      return this.eventsService.findByCategories(categoryList);
    }
    return this.eventsService.findAll();
  }

  @Post()
  create(@Body() createEventDto: CreateEventDto): EventDto {
    this.logger.log(`POST /api/events called with: ${JSON.stringify(createEventDto)}`);
    
    // Validation für required fields
    if (!createEventDto.name || !createEventDto.type || !createEventDto.time || 
        !createEventDto.date || !createEventDto.position || createEventDto.participants === undefined) {
      throw new BadRequestException('Missing required fields: name, type, time, date, position, participants');
    }

    // Date format validation (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(createEventDto.date)) {
      throw new BadRequestException('Date must be in YYYY-MM-DD format');
    }

    // Position validation
    if (!Array.isArray(createEventDto.position) || createEventDto.position.length !== 2) {
      throw new BadRequestException('Position must be an array with [latitude, longitude]');
    }

    const result = this.eventsService.create(createEventDto);
    this.logger.log(`Event created: ${JSON.stringify(result)}`);
    return result;
  }

  @Post(':id/join')
  join(@Param('id', ParseIntPipe) id: number): EventDto {
    return this.eventsService.join(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): { message: string } {
    return this.eventsService.remove(id);
  }
}
