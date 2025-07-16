import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Interest')
@Controller('interest')
export class InterestController {
  @Get()
  @ApiOperation({
    summary: 'Alle Interessen abrufen',
    description: 'Gibt eine Liste aller verfügbaren Interessen zurück. Diese können z.B. für die Event-Suche genutzt werden.',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste aller Interessen',
    schema: {
      example: [
        { id: 1, name: 'Sport' },
        { id: 2, name: 'Musik' },
      ],
    },
  })
  findAll() {
    return [
      { id: 1, name: 'Sport' },
      { id: 2, name: 'Musik' },
    ];
  }

  @Post()
  @ApiOperation({
    summary: 'Interesse hinzufügen',
    description: 'Fügt ein neues Interesse hinzu. Das Feld "name" ist erforderlich.',
  })
  @ApiBody({
    description: 'Interesse-Daten',
    schema: {
      example: { name: 'Lesen' },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Interesse erfolgreich hinzugefügt',
    schema: {
      example: { id: 3, name: 'Lesen' },
    },
  })
  create(@Body() body: { name: string }) {
    return { id: 3, name: body.name };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Einzelnes Interesse abrufen',
    description: 'Gibt ein einzelnes Interesse anhand der ID zurück.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID des Interesses',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Gefundenes Interesse',
    schema: {
      example: { id: 1, name: 'Sport' },
    },
  })
  findOne(@Param('id') id: string) {
    return { id: Number(id), name: 'Sport' };
  }
}
