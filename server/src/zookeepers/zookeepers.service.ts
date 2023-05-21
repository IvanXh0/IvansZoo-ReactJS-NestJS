import { AnimalsService } from './../animals/animals.service';
/*
https://docs.nestjs.com/providers#services
*/

import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { Zookeeper } from './interfaces/zookeeper';
import {
  AssignAnimalDto,
  ZookeeperCreateDto,
  ZookeeperResponseDto,
  ZookeeperUpdateDto,
} from './dtos/zookeeper.dto';
import { ZookeeperQueryDto } from './dtos/zookeeper-query.dto';
import { ILike, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class ZookeepersService {
  constructor(
    @Inject('ZOOKEEPER_REPOSITORY')
    private zookeeperRepository: Repository<Zookeeper>,
    @Inject(forwardRef(() => AnimalsService))
    private animalsService: AnimalsService,
  ) {}

  async getAllZookeepers(
    query: ZookeeperQueryDto,
  ): Promise<ZookeeperResponseDto[]> {
    const { location = '', age = 1, isActive, name = '' } = query;

    const zookeepers = await this.zookeeperRepository.find({
      where: {
        location: ILike(`%${location}%`),
        age: MoreThanOrEqual(age),
        isActive,
        name: ILike(`%${name}%`),
      },
      relations: ['animals'],
    });
    return zookeepers;
  }

  addNewZookeeper(
    zookeeper: ZookeeperCreateDto,
  ): Promise<ZookeeperResponseDto> {
    return this.zookeeperRepository.save(zookeeper);
  }

  async getZookeeper(id: string): Promise<ZookeeperResponseDto> {
    const zookeeper = await this.zookeeperRepository.findOne({
      where: {
        id,
      },
      relations: ['animals'],
    });
    return zookeeper;
  }

  async editZookeeper(
    id: string,
    updateData: ZookeeperUpdateDto,
  ): Promise<ZookeeperResponseDto> {
    await this.getZookeeper(id);

    try {
      await this.zookeeperRepository.save({
        id,
        ...updateData,
      });
    } catch (error) {
      throw new BadRequestException(
        `Error while editing data for the zookeeper with ID: ${id}.`,
      );
    }

    return this.getZookeeper(id);
  }

  async deleteZookeeper(id: string): Promise<void> {
    const zookeeper = await this.getZookeeper(id);

    const hasAnimals = zookeeper?.animals?.length > 0;

    if (hasAnimals) {
      for (const animal of zookeeper.animals) {
        await this.animalsService.removeAnimalsFromZookeeper(animal.id);
      }
    }

    await this.zookeeperRepository.delete(id);
  }

  // async assignAnimal(
  //   zookeeperId: string,
  //   animalIds: string[],
  // ): Promise<ZookeeperResponseDto> {
  //   const zookeeper = await this.getZookeeper(zookeeperId);

  //   zookeeper.animals = animalIds.map(id => ({ id }));

  //   await this.zookeeperRepository.save(zookeeper);

  //   return this.getZookeeper(zookeeperId);
  // }

  async assignAnimal(
    id: string,
    animalIds: string[],
  ): Promise<ZookeeperResponseDto> {
    const zookeeper = await this.getZookeeper(id);

    if (!zookeeper) {
      throw new NotFoundException('Zookeeper not found');
    }

    const animalsToAdd = await this.animalsService.getAnimalsById(animalIds);

    zookeeper.animals = [...zookeeper.animals, ...animalsToAdd];
    await this.zookeeperRepository.save(zookeeper);

    return this.getZookeeper(id);
  }
}
