/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import {
  AnimalCreateDto,
  AnimalResponseDto,
  AnimalUpdateDto,
} from './dtos/animal.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AnimalQueryDto } from './dtos/animal-query.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RolesEnum } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Animals')
@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}
  @ApiResponse({
    status: 200,
    description: 'All animals in the zoo',
  })
  @Get()
  @Roles(RolesEnum.admin, RolesEnum.user)
  @UsePipes(ValidationPipe)
  getAllAnimals(@Query() query: AnimalQueryDto): Promise<AnimalResponseDto[]> {
    return this.animalsService.getAllAnimals(query);
  }

  @ApiResponse({
    status: 200,
    description: 'Found animal by ID',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'No animal found with that ID',
  })
  @Roles(RolesEnum.admin, RolesEnum.user)
  @Get(':id')
  getAnimalById(@Param('id') id: string): Promise<AnimalResponseDto> {
    return this.animalsService.getAnimal(id);
  }

  @Post()
  @Roles(RolesEnum.admin)
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    status: 201,
    description: 'The added animal',
  })
  addNewAnimal(@Body() animal: AnimalCreateDto): Promise<AnimalResponseDto> {
    return this.animalsService.addNewAnimal(animal);
  }

  @ApiResponse({
    status: 200,
    description: 'The animal data has been updated',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'The specified animal has not been found',
  })
  @Roles(RolesEnum.admin)
  @Put(':id')
  @UsePipes(ValidationPipe)
  editAnimal(
    @Param('id') id: string,
    @Body() updateData: AnimalUpdateDto,
  ): Promise<AnimalResponseDto> {
    return this.animalsService.editAnimal(id, updateData);
  }

  @ApiResponse({
    status: 200,
    description: 'Animal successfully deleted',
  })
  @Roles(RolesEnum.admin)
  @Delete(':id')
  deleteAnimal(@Param('id') id: string): Promise<void> {
    return this.animalsService.deleteAnimal(id);
  }
}
