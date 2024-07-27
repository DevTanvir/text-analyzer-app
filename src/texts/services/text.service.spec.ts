import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { TextOutput } from '../dtos/text-output.dto';
import { TextWordOutput } from '../dtos/text-word-output.dto';
import { TextRepository } from '../repositories/text.repository';
import { TextService } from './text.service';

describe('TextsService', () => {
  let service: TextService;

  const mockedRepository = {
    getById: jest.fn(),
  };

  const mockedCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
  };

  const mockedLogger = { setContext: jest.fn(), log: jest.fn() };
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        TextService,
        {
          provide: TextRepository,
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            findAndCount: jest.fn(),
            getById: jest.fn(),
            remove: jest.fn(),
          },
        },
        { provide: TextRepository, useValue: mockedRepository },
        { provide: AppLogger, useValue: mockedLogger },
        {
          provide: CACHE_MANAGER,
          useValue: mockedCacheManager,
        },
      ],
    }).compile();

    service = moduleRef.get<TextService>(TextService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const ctx = new RequestContext();

  describe('countWords', () => {
    it('should count words of the input correctly', async () => {
      const text = 'Hello World';
      const result = await service.countWords(ctx, text);
      expect(result).toEqual(2);
    });
    it('should throw error when text in not provided', async () => {
      jest
        .spyOn(service, 'countWords')
        .mockImplementation(async (): Promise<TextOutput> => {
          throw new BadRequestException('content should not be empty');
        });

      await expect(service.countWords(ctx, '')).rejects.toThrow(
        'content should not be empty',
      );
    });
  });

  describe('countCharacters', () => {
    it('should count characters of the input correctly', async () => {
      const text = 'Bridge on the river kwai';
      const result = await service.countCharacters(ctx, text);
      expect(result).toEqual(24);
    });
    it('should throw error when text in not provided', async () => {
      jest
        .spyOn(service, 'countCharacters')
        .mockImplementation(async (): Promise<TextOutput> => {
          throw new BadRequestException('content should not be empty');
        });

      await expect(service.countCharacters(ctx, '')).rejects.toThrow(
        'content should not be empty',
      );
    });
  });

  describe('countSentences', () => {
    it('should count sentences of the input correctly', async () => {
      const text = 'The killing fields is a great movie. It is about cambodia';
      const result = await service.countSentences(ctx, text);
      expect(result).toEqual(2);
    });
    it('should throw error when text in not provided', async () => {
      jest
        .spyOn(service, 'countSentences')
        .mockImplementation(async (): Promise<TextOutput> => {
          throw new BadRequestException('content should not be empty');
        });

      await expect(service.countSentences(ctx, '')).rejects.toThrow(
        'content should not be empty',
      );
    });
  });

  describe('countParagraphs', () => {
    it('should count paragraphs correctly', async () => {
      const text =
        'This the 1st part of the paragraph. \nThis the 2nd part of the paragraph. \nThis the 3rd part of the paragraph.';
      const result = await service.countParagraphs(ctx, text);
      expect(result).toEqual(3);
    });
    it('should throw error when text in not provided', async () => {
      jest
        .spyOn(service, 'countParagraphs')
        .mockImplementation(async (): Promise<TextOutput> => {
          throw new BadRequestException('content should not be empty');
        });

      await expect(service.countParagraphs(ctx, '')).rejects.toThrow(
        'content should not be empty',
      );
    });
  });

  describe('longestWordInParagraphs', () => {
    it('should count the longest word in a paragraph correctly', async () => {
      const text =
        'This the 1st part of the paragraph. \nThis the 2nd part of the paragraph. \nThis the 3rd part of the paragraph.';
      const result = await service.longestWordInParagraphs(ctx, text);
      expect(result).toEqual({
        paragraphs: 3,
        longestWord: 'paragraph',
      });
    });
    it('should throw error when text is not provided', async () => {
      jest
        .spyOn(service, 'longestWordInParagraphs')
        .mockImplementation(async (): Promise<TextWordOutput> => {
          throw new BadRequestException('content should not be empty');
        });

      await expect(service.longestWordInParagraphs(ctx, '')).rejects.toThrow(
        'content should not be empty',
      );
    });
  });
});
