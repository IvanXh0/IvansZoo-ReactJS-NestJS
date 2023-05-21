import { ZookeepersService } from './zookeepers.service';
import { ZookeepersController } from './zookeepers.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { zookeeperProviders } from './zookeepers.providers';
import { animalProviders } from '../animals/animals.providers';
import { AnimalsService } from '../animals/animals.service';
import { JwtService } from '@nestjs/jwt';

/*
https://docs.nestjs.com/modules
*/

@Module({
  imports: [DatabaseModule],
  controllers: [ZookeepersController],
  providers: [
    ...zookeeperProviders,
    ...animalProviders,
    JwtService,
    ZookeepersService,
    AnimalsService,
  ],
})
export class ZookeepersModule {}
