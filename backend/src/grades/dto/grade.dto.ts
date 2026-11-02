import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateGradeDto {
  @IsUUID()
  studentId!: string;

  @IsUUID()
  courseId!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  title!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  score!: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  maxScore!: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  percentage!: number;
}

export class UpdateGradeDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  score?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  maxScore?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  percentage?: number;
}
