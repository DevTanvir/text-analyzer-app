import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { TextOutput } from '../dtos/text-output.dto';
import { TextWordOutput } from '../dtos/text-word-output.dto';

@Injectable()
export class TextService {
  constructor(private readonly logger: AppLogger) {
    this.logger.setContext(TextService.name);
  }

  async countWords(ctx: RequestContext, text: string): Promise<TextOutput> {
    this.logger.log(ctx, `${this.countWords.name} was called`);

    const textCount = text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/).length;

    return plainToClass(TextOutput, textCount, {
      excludeExtraneousValues: true,
    });
  }

  async countCharacters(
    ctx: RequestContext,
    text: string,
  ): Promise<TextOutput> {
    this.logger.log(ctx, `${this.countCharacters.name} was called`);

    const textCharCount = text.toLowerCase().replace(/[^\w\s]/g, '').length;
    return plainToClass(TextOutput, textCharCount, {
      excludeExtraneousValues: true,
    });
  }

  async countSentences(ctx: RequestContext, text: string): Promise<TextOutput> {
    this.logger.log(ctx, `${this.countSentences.name} was called`);

    const textSentenceCount = text
      .split(/[.!?]/)
      .filter((sentence) => sentence.trim().length > 0).length;

    return plainToClass(TextOutput, textSentenceCount, {
      excludeExtraneousValues: true,
    });
  }

  async countParagraphs(
    ctx: RequestContext,
    text: string,
  ): Promise<TextOutput> {
    this.logger.log(ctx, `${this.countParagraphs.name} was called`);

    const textParagraphCount = text
      .split(/\n\n/)
      .filter((paragraph) => paragraph.trim().length > 0).length;

    return plainToClass(TextOutput, textParagraphCount, {
      excludeExtraneousValues: true,
    });
  }

  async longestWordInParagraphs(
    ctx: RequestContext,
    text: string,
  ): Promise<TextWordOutput> {
    this.logger.log(ctx, `${this.longestWordInParagraphs.name} was called`);

    const textParagraphCount = text
      .split(/\n\n/)
      .filter((paragraph) => paragraph.trim().length > 0).length;

    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/);

    const longestWord = words.reduce(
      (longest, current) =>
        current.length > longest.length ? current : longest,
      '',
    );

    const data = {
      paragraphs: textParagraphCount,
      longestWord: longestWord,
    };

    return plainToClass(TextWordOutput, data, {
      excludeExtraneousValues: true,
    });
  }
}
