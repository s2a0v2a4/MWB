import { Controller, Get, Post, Body, BadRequestException, Logger } from '@nestjs/common';
import { mapInterestsToCategories } from './interest-category.mapping';

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

  @Get('categories')
  getSelectedCategories() {
    const categories = mapInterestsToCategories(this.userInterests);
    return {
      categories,
      count: categories.length,
      interests: this.userInterests,
    };
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
