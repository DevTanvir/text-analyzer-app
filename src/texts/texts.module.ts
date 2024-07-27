import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from '../shared/shared.module';
import { TextController } from './controllers/text.controller';
import { Text } from './entities/text.entity';
import { TextRepository } from './repositories/text.repository';
import { TextService } from './services/text.service';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([Text])],
  controllers: [TextController],
  providers: [TextService, TextRepository],
})
export class TextsModule {}
