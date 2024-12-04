import { Type } from 'class-transformer';
import {
  IsNumber,
  Min,
  Max,
  IsString,
  IsIn,
  IsOptional,
} from 'class-validator';
import { Countries } from '../utils/countries';

export class OfferDto {
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(10000)
  weight: number;

  @Type(() => Number)
  @IsNumber()
  @Min(10)
  @Max(100)
  length: number;

  @Type(() => Number)
  @IsNumber()
  @Min(10)
  @Max(100)
  width: number;

  @Type(() => Number)
  @IsNumber()
  @IsNumber()
  @Min(10)
  @Max(100)
  height: number;

  @IsString()
  @IsIn(Countries)
  country: string;

  @IsOptional()
  @IsString()
  @IsIn(['Express', 'Economique'])
  type?: string;
}
