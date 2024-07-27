import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TextInput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;
}
