import { Transform } from 'class-transformer';
import { IsNumber, Min, Max, IsString } from 'class-validator';

export class OfferQueryDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  weight: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(10)
  @Max(100)
  length: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(10)
  @Max(100)
  width: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(10)
  @Max(100)
  height: number;

  @IsString()
  country: string;
}
