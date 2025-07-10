import { Test, TestingModule } from '@nestjs/testing';
import { InterestsController } from './interests.controller';
import { BadRequestException } from '@nestjs/common';

describe('InterestsController', () => {
  let controller: InterestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterestsController],
    }).compile();

    controller = module.get<InterestsController>(InterestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return empty interests initially', () => {
    const result = controller.getInterests();
    expect(result).toEqual({ interests: [], count: 0 });
  });

  it('should save interests successfully', () => {
    const body = { interests: [1, 2, 3] };
    const result = controller.saveInterests(body);
    expect(result).toEqual({
      success: true,
      savedInterests: [1, 2, 3],
      message: 'Interests saved successfully',
    });
  });

  it('should throw BadRequestException for invalid interests', () => {
    const body = { interests: 'invalid' as any };
    expect(() => controller.saveInterests(body)).toThrow(BadRequestException);
  });

  it('should filter out invalid interest IDs', () => {
    const body = { interests: [1, -1, 2, 0, 3, 'invalid' as any] };
    const result = controller.saveInterests(body);
    expect(result.savedInterests).toEqual([1, 2, 3]);
  });

  it('should update interest count correctly', () => {
    // Erst Interessen speichern
    controller.saveInterests({ interests: [1, 2, 3] });
    
    // Dann abrufen und prüfen
    const result = controller.getInterests();
    expect(result.count).toBe(3);
    expect(result.interests).toEqual([1, 2, 3]);
  });

  it('should overwrite previous interests', () => {
    // Erste Interessen
    controller.saveInterests({ interests: [1, 2] });
    
    // Neue Interessen (überschreibt die alten)
    controller.saveInterests({ interests: [3, 4, 5] });
    
    const result = controller.getInterests();
    expect(result.interests).toEqual([3, 4, 5]);
    expect(result.count).toBe(3);
  });
});
