import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Animal } from '../interaces/animal';
import { Type } from 'class-transformer';
import { IsNotEmptyArray } from '../../common/validators/is-not-empty-array.validator';

export enum Enclosure {
  Mountain = 'mountain',
  Ice = 'ice',
  Water = 'water',
  Jungle = 'jungle',
  Desert = 'desert',
  Savana = 'savana',
  Ocean = 'ocean',
  Rainforest = 'rainforest',
}

export class AnimalCharacteristicsDto {
  @IsString({ each: true })
  @IsNotEmptyArray()
  @ApiProperty({
    type: [String],
    description: 'The types of food that the animal eats',
    example: ['meat', 'vegetables'],
  })
  food: string[];

  @IsString()
  @ApiProperty({
    type: String,
    description: 'The color of the animal',
    example: 'brown',
  })
  colour: string;

  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: 'Whether the animal is dangerous or not',
    example: false,
  })
  isDangerous: boolean;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    type: Number,
    description: 'The weight of the animal',
    example: 150,
  })
  weight: number;

  @IsEnum(Enclosure)
  @ApiProperty({
    type: String,
    enum: Enclosure,
    description: 'The type of enclosure that the animal requires',
    example: 'jungle',
  })
  enclosure: Enclosure;
}

export class AnimalCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The name of the animal',
    example: 'Petko',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The type of the animal',
    example: 'Lion',
  })
  type: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @ApiProperty({
    type: Number,
    description: 'The age of the animal',
    example: 3,
  })
  age: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The location of the animal',
    example: 'Skopje',
  })
  location: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['M', 'F'])
  @ApiProperty({
    type: String,
    description: 'The gender of the animal',
    example: 'M',
  })
  gender: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AnimalCharacteristicsDto)
  @ApiProperty({
    type: AnimalCharacteristicsDto,
    description: 'The animal characteristics',
    required: true,
  })
  characteristics: AnimalCharacteristicsDto;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    required: false,
    type: String,
    example: '84c88389-3a92-4f5f-8e71-5e0e29e137e3"',
    description: 'The ID of the zookeeper',
  })
  zookeeperId?: string;
}

export class AnimalResponseDto extends AnimalCreateDto implements Animal {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The id of the animal',
    example: '64416a1d723b65ab35909e1d',
  })
  id: string;
}

export class AnimalUpdateDto extends AnimalCreateDto {}
