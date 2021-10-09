import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
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
  firstName: string;

  @IsString()
  @MinLength(1)
  address: string;

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  hasChildren: boolean;

  @IsInt()
  @Min(1)
  @Max(100)
  @ValidateIf((obj) => obj.hasChildren)
  @Transform(({ value }) => Number(value))
  childrenNumber?: number;

  @IsEnum(Occupation)
  occupation: Occupation;

  @IsEmail()
  email: string;
}
