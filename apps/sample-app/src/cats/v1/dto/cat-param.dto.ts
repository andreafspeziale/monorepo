import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CatParam {
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  id!: number;
}
