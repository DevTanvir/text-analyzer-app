import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  BaseApiErrorResponse,
  SwaggerBaseApiResponse,
} from '../../shared/dtos/base-api-response.dto';
import { AppLogger } from '../../shared/logger/logger.service';
import { ReqContext } from '../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { TextInput } from '../dtos/text-input.dto';
import { TextOutput } from '../dtos/text-output.dto';
import { TextWordOutput } from '../dtos/text-word-output.dto';
import { TextService } from '../services/text.service';

@ApiTags('texts')
@Controller('texts')
export class TextController {
  constructor(
    private readonly textService: TextService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(TextController.name);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('word-count')
  @ApiOperation({
    summary: 'Get word count API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(TextOutput),
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BaseApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: BaseApiErrorResponse,
  })
  async countWords(
    @ReqContext() ctx: RequestContext,
    @Body() input: TextInput,
  ) {
    this.logger.log(ctx, `${this.countWords.name} was called`);
    const textWordCount = await this.textService.countWords(ctx, input.content);

    return { data: textWordCount, meta: {} };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('character-count')
  @ApiOperation({
    summary: 'Get character count API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(TextOutput),
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BaseApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: BaseApiErrorResponse,
  })
  async countCharacters(
    @ReqContext() ctx: RequestContext,
    @Body() input: TextInput,
  ) {
    this.logger.log(ctx, `${this.countCharacters.name} was called`);
    const textCharCount = await this.textService.countCharacters(
      ctx,
      input.content,
    );
    return { data: textCharCount, meta: {} };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('sentence-count')
  @ApiOperation({
    summary: 'Get sentence count API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(TextOutput),
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BaseApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: BaseApiErrorResponse,
  })
  async countSentences(
    @ReqContext() ctx: RequestContext,
    @Body() input: TextInput,
  ) {
    this.logger.log(ctx, `${this.countSentences.name} was called`);
    const textSentenceCount = await this.textService.countSentences(
      ctx,
      input.content,
    );
    return { data: textSentenceCount, meta: {} };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('paragraph-count')
  @ApiOperation({
    summary: 'Get paragraph count API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(TextOutput),
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BaseApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: BaseApiErrorResponse,
  })
  async countParagraphs(
    @ReqContext() ctx: RequestContext,
    @Body() input: TextInput,
  ) {
    this.logger.log(ctx, `${this.countParagraphs.name} was called`);
    const textParagraphCount = await this.textService.countParagraphs(
      ctx,
      input.content,
    );
    return { data: textParagraphCount, meta: {} };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('longest-word')
  // over-riding global throttle method
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @ApiOperation({
    summary: 'Get longest word in paragraphs API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(TextWordOutput),
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BaseApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: BaseApiErrorResponse,
  })
  async longestWordInParagraphs(
    @ReqContext() ctx: RequestContext,
    @Body() query: TextInput,
  ) {
    this.logger.log(ctx, `${this.longestWordInParagraphs.name} was called`);
    const text = await this.textService.longestWordInParagraphs(
      ctx,
      query.content,
    );
    return { data: text, meta: {} };
  }
}
