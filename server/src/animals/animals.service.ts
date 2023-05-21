/*
https://docs.nestjs.com/providers#services
*/

import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Animal } from './interaces/animal';
import {
  AnimalCreateDto,
  AnimalResponseDto,
  AnimalUpdateDto,
} from './dtos/animal.dto';
import { AnimalQueryDto } from './dtos/animal-query.dto';
import { ILike, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class AnimalsService {
  constructor(
    @Inject('ANIMAL_REPOSITORY') private animalRepository: Repository<Animal>,
  ) {}

  async getAllAnimals(query: AnimalQueryDto): Promise<AnimalResponseDto[]> {
    const { location = '', gender = '', age = 1 } = query;

    const animals = await this.animalRepository.find({
      where: {
        location: ILike(`%${location}%`),
        gender: ILike(`%${gender}%`),
        age: MoreThanOrEqual(age),
      },
      relations: ['zookeeper'],
    });

    return animals;
  }
  async getAnimal(id: string): Promise<AnimalResponseDto> {
    const animal = await this.animalRepository.findOne({
      where: { id },
      relations: ['zookeeper'],
    });

    return animal;
  }

  addNewAnimal(body: AnimalCreateDto): Promise<AnimalResponseDto> {
    return this.animalRepository.save(body);
  }

  async getAnimalsById(id: string[]): Promise<AnimalResponseDto[]> {
    const animals = await this.animalRepository.findByIds(id);

    return animals;
  }

  async editAnimal(
    id: string,
    updateData: AnimalUpdateDto,
  ): Promise<AnimalResponseDto> {
    await this.getAnimal(id);

    try {
      await this.animalRepository.save({
        id,
        ...updateData,
      });
    } catch (error) {
      throw new BadRequestException(
        `Error while editing data for the animal with ID: ${id}.`,
      );
    }

    return this.getAnimal(id);
  }

  async deleteAnimal(id: string): Promise<void> {
    await this.animalRepository.softDelete(id);
  }

  async removeAnimalsFromZookeeper(id: string): Promise<void> {
    const animal = this.getAnimal(id);

    await this.animalRepository.save({
      id,
      zookeeper: null,
    });
  }
}
