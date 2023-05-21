import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { animalProviders } from './animals.providers';
import { JwtService } from '@nestjs/jwt';
/*
https://docs.nestjs.com/modules
*/

@Module({
  imports: [DatabaseModule],
  controllers: [AnimalsController],
  providers: [...animalProviders, JwtService, AnimalsService],
})
export class AnimalsModule {}
