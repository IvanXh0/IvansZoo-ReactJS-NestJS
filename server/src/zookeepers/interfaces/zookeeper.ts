import { Animal } from '../../animals/interaces/animal';

export interface Zookeeper {
  id: string;
  name: string;
  age: number;
  location: string;
  isActive: boolean;
  animals: Animal[];
}
