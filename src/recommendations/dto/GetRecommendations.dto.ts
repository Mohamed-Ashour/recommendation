import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsBooleanString,
  IsEmail,
  IsEnum,
  IsIn,
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Occupation } from '../constants/recommendations';

export class GetRecommendationsDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  readonly firstName: string;

  @IsString()
  @MinLength(1)
  readonly address: string;

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  readonly hasChildren: boolean;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @Max(100)
  @ValidateIf((obj) => obj.hasChildren)
  readonly childrenNumber: number;

  @IsEnum(Occupation)
  readonly occupation: string;

  @IsEmail()
  readonly email: string;
}
