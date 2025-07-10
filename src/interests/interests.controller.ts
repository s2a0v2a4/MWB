import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';

@Controller('api/interests')
export class InterestsController {
  private userInterests: number[] = [];

  @Get()
  getInterests() {
    return {
      interests: this.userInterests,
      count: this.userInterests.length,
    };
  }

  @Post()
  saveInterests(@Body() body: { interests: number[] }) {
    if (!Array.isArray(body.interests)) {
      throw new BadRequestException('Invalid interests - must be an array');
    }

    this.userInterests = body.interests;

    return {
      success: true,
      savedInterests: this.userInterests,
      message: 'Interests saved successfully',
    };
  }
}
