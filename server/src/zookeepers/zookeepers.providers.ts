import { DataSource } from 'typeorm';
import { Zookeeper } from './zookeeper.entity';

export const zookeeperProviders = [
  {
    provide: 'ZOOKEEPER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Zookeeper),
    inject: ['DATA_SOURCE'],
  },
];
