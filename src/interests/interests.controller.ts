import { Controller, Get, Post, Body, BadRequestException, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { mapInterestsToCategories } from './interest-category.mapping';

@ApiTags('Interests')
@Controller('interests') // ❗️ kein doppeltes 'api' mehr!
export class InterestsController {
  private readonly logger = new Logger(InterestsController.name);
  private userInterests: number[] = [];

  @Get()
  @ApiOperation({ summary: 'Get all user interests' })
  @ApiResponse({ status: 200, description: 'List of user interests.' })
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
  @ApiOperation({ summary: 'Get selected categories for user interests' })
  @ApiResponse({ status: 200, description: 'Categories mapped from user interests.' })
  getSelectedCategories() {
    const categories = mapInterestsToCategories(this.userInterests);
    return {
      categories,
      count: categories.length,
      interests: this.userInterests,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Save user interests' })
  @ApiBody({ schema: { example: { interests: [1, 2, 3] } } })
  @ApiResponse({ status: 201, description: 'Interests saved successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid interests - must be an array' })
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
