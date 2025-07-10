import { Module } from '@nestjs/common';
import { InterestsController } from './interests/interests.controller';

@Module({
  controllers: [InterestsController],
})
export class AppModule {}

import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';

@Controller('interests') // ❗️ kein doppeltes 'api' mehr!
export class InterestsController {
  private readonly logger = new Logger(InterestsController.name);
  private userInterests: number[] = [];

  @Get()
  getInterests() {
    this.logger.log('GET /api/interests called');
    const result = {
      interests: this.userInterests,
      count: this.userInterests.length,
    };
    this.logger.log(`Returning interests: ${JSON.stringify(result)}`);
    return result;
  }

  @Post()
  saveInterests(@Body() body: { interests: number[] }) {
    this.logger.log(`POST /api/interests called with body: ${JSON.stringify(body)}`);
    
    if (!body || !Array.isArray(body.interests)) {
      this.logger.error('Invalid interests data received');
      throw new BadRequestException('Invalid interests - must be an array');
    }

    // Validierung: nur positive Zahlen erlauben
    const validInterests = body.interests.filter(id => 
      typeof id === 'number' && id > 0
    );

    this.userInterests = validInterests;

    const result = {
      success: true,
      savedInterests: this.userInterests,
      message: 'Interests saved successfully',
    };
    
    this.logger.log(`Interests saved: ${JSON.stringify(result)}`);
    return result;
  }
}
