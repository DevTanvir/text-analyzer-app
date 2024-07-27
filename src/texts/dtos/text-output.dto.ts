import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TextOutput {
  @ApiProperty()
  @Expose()
  count: number;
}
