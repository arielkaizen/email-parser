import { ApiProperty } from '@nestjs/swagger';
import { ORIGIN } from '../enum/origin.enum';

export class JsonFileDto {
  @ApiProperty({ description: 'Name of the file' })
  fileName: string | undefined;

  @ApiProperty({ description: 'Type of origin', enum: ORIGIN })
  origin: ORIGIN;

  @ApiProperty({ description: 'JSON content' })
  json: any;
}