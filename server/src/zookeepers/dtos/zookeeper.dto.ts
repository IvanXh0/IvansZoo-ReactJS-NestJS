import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { Zookeeper } from '../interfaces/zookeeper';
import { AnimalResponseDto } from '../../animals/dtos/animal.dto';

export class ZookeeperCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The name of the zookeeper',
    example: 'Ivan',
  })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @ApiProperty({
    type: Number,
    description: 'The age of the zookeeper',
    example: 18,
  })
  age: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The location of the zookeeper',
    example: 'Skopje',
  })
  location: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    description: 'Is the zookeeper in service',
    example: true,
  })
  isActive: boolean;
}

export class AssignAnimalDto {
  @ApiProperty({
    type: [String],
  })
  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty({ each: true })
  animalIds: string[];
}

export class ZookeeperResponseDto
  extends ZookeeperCreateDto
  implements Zookeeper
{
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The ID of the zookeeper',
    example: '64416a1d723b65ab35909e1d',
  })
  id: string;

  @ApiProperty({
    type: [AnimalResponseDto],
    description: 'The animals assigned to the zookeeper',
    required: true,
  })
  animals: AnimalResponseDto[];
}

export class ZookeeperUpdateDto extends ZookeeperCreateDto {}
