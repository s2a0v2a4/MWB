import { Controller, Get, Post, Body, Param, Query, BadRequestException, Logger } from '@nestjs/common';
<<<<<<< HEAD
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
=======
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
>>>>>>> 7b1ad9be6eba91db2856bfca9151adbacf2e7430
import { EventsService } from './events.service';
import { EventDto } from './interfaces/event.interface';
import { CreateEventDto } from './dto/create-event.dto';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(private readonly eventsService: EventsService) {}

  @Get()
<<<<<<< HEAD
  @ApiOperation({
    summary: 'Alle Events abrufen',
    description: 'Gibt eine Liste aller Events zurück. Optional kann nach Kategorien gefiltert werden.',
  })
  @ApiQuery({
    name: 'categories',
    required: false,
    description: 'Kommaseparierte Liste von Kategorien zur Filterung (z. B. "Sport,Musik").',
    example: 'Sport,Musik',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste aller verfügbaren Events',
    schema: {
      example: [
        {
          id: 1,
          name: 'Testevent',
          type: 'Walking',
          time: '14:30',
          date: '2025-07-16',
          participants: 3,
          position: [50.98, 12.97],
        },
      ],
    },
  })
=======
  @ApiOperation({ summary: 'Get all events or filter by categories' })
  @ApiQuery({ name: 'categories', required: false, description: 'Comma-separated list of categories' })
  @ApiResponse({ status: 200, description: 'List of events.' })
>>>>>>> 7b1ad9be6eba91db2856bfca9151adbacf2e7430
  findAll(@Query('categories') categories?: string): EventDto[] {
    this.logger.log('GET /api/events called');
    let result: EventDto[];

    if (categories) {
      const categoryList = categories.split(',');
      result = this.eventsService.findByCategories(categoryList);
    } else {
      result = this.eventsService.findAll();
    }

    this.logger.log(`Returning ${result.length} events`);
    return result;
  }

  @Post()
<<<<<<< HEAD
  @ApiOperation({
    summary: 'Neues Event erstellen',
    description: 'Erstellt ein neues Event mit allen erforderlichen Informationen wie Name, Typ, Datum, Zeit, Teilnehmerzahl und Position.',
  })
  @ApiBody({
    description: 'Daten zur Erstellung eines neuen Events',
    type: CreateEventDto,
    examples: {
      Beispiel: {
        summary: 'Event Beispiel',
        value: {
          name: 'Hackathon',
          type: 'Coding',
          time: '10:00',
          date: '2025-08-15',
          participants: 10,
          position: [50.99, 12.98],
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Event wurde erfolgreich erstellt',
    schema: {
      example: {
        id: 2,
        name: 'Hackathon',
        type: 'Coding',
        time: '10:00',
        date: '2025-08-15',
        participants: 10,
        position: [50.99, 12.98],
      },
    },
  })
=======
  @ApiOperation({ summary: 'Create a new event' })
  @ApiBody({ type: CreateEventDto })
  @ApiResponse({ status: 201, description: 'Event created.' })
  @ApiResponse({ status: 400, description: 'Missing or invalid fields.' })
>>>>>>> 7b1ad9be6eba91db2856bfca9151adbacf2e7430
  create(@Body() createEventDto: CreateEventDto): EventDto {
    this.logger.log(`POST /api/events called with: ${JSON.stringify(createEventDto)}`);

    if (
      !createEventDto.name ||
      !createEventDto.type ||
      !createEventDto.time ||
      !createEventDto.date ||
      !createEventDto.position ||
      createEventDto.participants === undefined
    ) {
      throw new BadRequestException('Missing required fields: name, type, time, date, position, participants');
    }

    if (!Array.isArray(createEventDto.position) || createEventDto.position.length !== 2) {
      throw new BadRequestException('Position must be an array with [latitude, longitude]');
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(createEventDto.date)) {
      throw new BadRequestException('Date must be in YYYY-MM-DD format');
    }

    const result = this.eventsService.create(createEventDto);
    this.logger.log(`Event created: ${JSON.stringify(result)}`);
    return result;
  }

  @Post(':id/join')
<<<<<<< HEAD
  @ApiOperation({
    summary: 'Event beitreten',
    description: 'Erhöht die Teilnehmerzahl des angegebenen Events um 1.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID des Events, dem beigetreten werden soll.',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 201,
    description: 'Teilnahme erfolgreich, Teilnehmerzahl wurde erhöht.',
    schema: {
      example: {
        id: 1,
        name: 'Testevent',
        type: 'Walking',
        time: '14:30',
        date: '2025-07-16',
        participants: 4,
        position: [50.98, 12.97],
      },
    },
  })
=======
  @ApiOperation({ summary: 'Join an event by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Event ID' })
  @ApiResponse({ status: 201, description: 'Joined event.' })
>>>>>>> 7b1ad9be6eba91db2856bfca9151adbacf2e7430
  join(@Param('id') id: string): EventDto {
    return this.eventsService.join(+id);
  }
}
