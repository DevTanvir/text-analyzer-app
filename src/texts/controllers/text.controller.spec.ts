import { Test, TestingModule } from '@nestjs/testing';

import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { TextInput } from '../dtos/text-input.dto';
import { TextService } from '../services/text.service';
import { TextController } from './text.controller';

describe('TextsController', () => {
  let controller: TextController;

  const mockedTextService = {
    countWords: jest.fn(),
    countCharacters: jest.fn(),
    countSentences: jest.fn(),
    countParagraphs: jest.fn(),
    longestWordInParagraphs: jest.fn(),
  };

  const mockLogger = { setContext: jest.fn(), log: jest.fn() };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [TextController],
      providers: [
        { provide: TextService, useValue: mockedTextService },
        { provide: AppLogger, useValue: mockLogger },
      ],
    }).compile();

    controller = moduleRef.get<TextController>(TextController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const ctx = new RequestContext();

  describe('countWords', () => {
    it('should call countWords function with correct input', async () => {
      const query = new TextInput();
      query.content = 'hello';
      controller.countWords(ctx, query);
      expect(controller.countWords).toBeDefined();
      expect(mockedTextService.countWords).toHaveBeenCalledWith(
        ctx,
        query.content,
      );
    });
  });

  describe('countCharacters', () => {
    it('should call countCharacters function with correct input', async () => {
      const query = new TextInput();
      query.content = 'The Lazy Fox';
      controller.countCharacters(ctx, query);
      expect(controller.countCharacters).toBeDefined();
      expect(mockedTextService.countCharacters).toHaveBeenCalledWith(
        ctx,
        query.content,
      );
    });
  });

  describe('countSentences', () => {
    it('should call countSentences function with correct input', async () => {
      const query = new TextInput();
      query.content = 'A sentence. Another. A third.';
      controller.countSentences(ctx, query);
      expect(controller.countSentences).toBeDefined();
      expect(mockedTextService.countSentences).toHaveBeenCalledWith(
        ctx,
        query.content,
      );
    });
  });

  describe('countParagraphs', () => {
    it('should call countParagraphs function with correct input', async () => {
      const query = new TextInput();
      query.content = 'A paragraph. \n\nAnother. \n\nA third.';
      controller.countParagraphs(ctx, query);
      expect(controller.countParagraphs).toBeDefined();
      expect(mockedTextService.countParagraphs).toHaveBeenCalledWith(
        ctx,
        query.content,
      );
    });
  });

  describe('longestWordInParagraphs', () => {
    it('should call longestWordInParagraphs function with correct input', async () => {
      const query = new TextInput();
      query.content =
        'A paragraph with the longest word. \n\nAnother paragraph. \n\nlast paragraph.';
      controller.longestWordInParagraphs(ctx, query);
      expect(controller.longestWordInParagraphs).toBeDefined();
      expect(mockedTextService.longestWordInParagraphs).toHaveBeenCalledWith(
        ctx,
        query.content,
      );
    });
  });
});
