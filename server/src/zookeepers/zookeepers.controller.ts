import { AnimalResponseDto } from 'src/animals/dtos/animal.dto';
import {
  AssignAnimalDto,
  ZookeeperCreateDto,
  ZookeeperResponseDto,
  ZookeeperUpdateDto,
} from './dtos/zookeeper.dto';
import { ZookeepersService } from './zookeepers.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ZookeeperQueryDto } from './dtos/zookeeper-query.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/auth/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Zookeepers')
@Controller('zookeepers')
export class ZookeepersController {
  constructor(private readonly zookeepersService: ZookeepersService) {}

  @ApiResponse({
    status: 200,
    description: 'All zookeepers in the zoo',
  })
  @Get()
  @UsePipes(ValidationPipe)
  @Roles(RolesEnum.admin, RolesEnum.user)
  getAllZookeepers(
    @Query() query: ZookeeperQueryDto,
  ): Promise<ZookeeperResponseDto[]> {
    return this.zookeepersService.getAllZookeepers(query);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @Roles(RolesEnum.admin)
  @ApiCreatedResponse({
    status: 201,
    description: 'The added zookeeper',
  })
  addNewZookeeper(
    @Body() zookeeper: ZookeeperCreateDto,
  ): Promise<ZookeeperResponseDto> {
    return this.zookeepersService.addNewZookeeper(zookeeper);
  }

  @Get(':id')
  @Roles(RolesEnum.admin, RolesEnum.user)
  @ApiResponse({
    status: 200,
    description: 'The found zookeeper',
  })
  getZookeeperById(@Param('id') id: string): Promise<ZookeeperResponseDto> {
    return this.zookeepersService.getZookeeper(id);
  }

  @ApiResponse({
    status: 200,
    description: 'The zookeeper data has been updated',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'The specified zookeeper has not been found',
  })
  @Put(':id')
  @Roles(RolesEnum.admin)
  @UsePipes(ValidationPipe)
  editZookeeper(
    @Param('id') id: string,
    @Body() updateData: ZookeeperUpdateDto,
  ): Promise<ZookeeperResponseDto> {
    return this.zookeepersService.editZookeeper(id, updateData);
  }

  @ApiResponse({
    status: 200,
    description: 'Zookeeper successfully deleted',
  })
  @Roles(RolesEnum.admin)
  @Delete(':id')
  deleteZookeeper(@Param('id') id: string): Promise<void> {
    return this.zookeepersService.deleteZookeeper(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Animal(s) successfully assigned to zookeeper',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Zookeeper not found.',
  })
  @Roles(RolesEnum.admin)
  @Patch(':id/animals')
  assignAnimal(@Param('id') id: string, @Body() body: AssignAnimalDto) {
    return this.zookeepersService.assignAnimal(id, body.animalIds);
  }
}
