import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { plainToClass } from 'class-transformer';

import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { TextOutput } from '../dtos/text-output.dto';
import { TextWordOutput } from '../dtos/text-word-output.dto';

@Injectable()
export class TextService {
  constructor(private readonly logger: AppLogger, @Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.logger.setContext(TextService.name);
  }

  async countWords(ctx: RequestContext, text: string): Promise<TextOutput> {
    this.logger.log(ctx, `${this.countWords.name} was called`);
    const cacheKey = ctx.user?.id + '-' + this.countWords.name;
    const cachedResult = await this.cacheManager.get<number>(cacheKey);

    if (cachedResult) {
      return plainToClass(TextOutput, cachedResult, {
        excludeExtraneousValues: true,
      });;
    }

    const textCount = text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/).length;

    await this.cacheManager.set(cacheKey, textCount);
    return plainToClass(TextOutput, textCount, {
      excludeExtraneousValues: true,
    });
  }

  async countCharacters(
    ctx: RequestContext,
    text: string,
  ): Promise<TextOutput> {
    this.logger.log(ctx, `${this.countCharacters.name} was called`);

    const cacheKey = ctx.user?.id + '-' + this.countCharacters.name;
    const cachedResult = await this.cacheManager.get<number>(cacheKey);
    if (cachedResult) {
      return plainToClass(TextOutput, cachedResult, {
        excludeExtraneousValues: true,
      });
    }

    const textCharCount = text.toLowerCase().replace(/[^\w\s]/g, '').length;

    await this.cacheManager.set(cacheKey, textCharCount);

    return plainToClass(TextOutput, textCharCount, {
      excludeExtraneousValues: true,
    });
  }

  async countSentences(ctx: RequestContext, text: string): Promise<TextOutput> {
    this.logger.log(ctx, `${this.countSentences.name} was called`);

    const cacheKey = ctx.user?.id + '-' + this.countSentences.name;

    const cachedResult = await this.cacheManager.get<number>(cacheKey);
    if (cachedResult) {
      return plainToClass(TextOutput, cachedResult, {
        excludeExtraneousValues: true,
      });
    }

    const textSentenceCount = text
      .split(/[.!?]/)
      .filter((sentence) => sentence.trim().length > 0).length;

    await this.cacheManager.set(cacheKey, textSentenceCount);
    return plainToClass(TextOutput, textSentenceCount, {
      excludeExtraneousValues: true,
    });
  }

  async countParagraphs(
    ctx: RequestContext,
    text: string,
  ): Promise<TextOutput> {
    this.logger.log(ctx, `${this.countParagraphs.name} was called`);

    const cacheKey = ctx.user?.id + '-' + this.countParagraphs.name;
    const cachedResult = await this.cacheManager.get<number>(cacheKey);
    if (cachedResult) {
      return plainToClass(TextOutput, cachedResult, {
        excludeExtraneousValues: true,
      });
    }
    const textParagraphCount = text
      .split(/\n/)
      .filter((paragraph) => paragraph.trim().length > 0).length;

    await this.cacheManager.set(cacheKey, textParagraphCount);
    return plainToClass(TextOutput, textParagraphCount, {
      excludeExtraneousValues: true,
    });
  }

  async longestWordInParagraphs(
    ctx: RequestContext,
    text: string,
  ): Promise<TextWordOutput> {
    this.logger.log(ctx, `${this.longestWordInParagraphs.name} was called`);

    const cacheKey = ctx.user?.id + '-' + this.longestWordInParagraphs.name;
    const cachedResult = await this.cacheManager.get<string>(cacheKey);
    if (cachedResult) {
      return plainToClass(TextWordOutput, cachedResult, {
        excludeExtraneousValues: true,
      });
    }

    const textParagraphCount = text
      .split(/\n/)
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

    await this.cacheManager.set(cacheKey, data);
    return plainToClass(TextWordOutput, data, {
      excludeExtraneousValues: true,
    });
  }
}
