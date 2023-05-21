import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Zookeeper } from '../zookeepers/zookeeper.entity';
import { AnimalCharacteristicsDto } from './dtos/animal.dto';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  age: number;

  @Column()
  location: string;

  @Column()
  gender: string;

  @Column('simple-json')
  characteristics: AnimalCharacteristicsDto;

  @Column({
    nullable: true,
  })
  zookeeperId: string;

  @ManyToOne(() => Zookeeper, (zookeeper) => zookeeper.animals)
  zookeeper: Zookeeper;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
