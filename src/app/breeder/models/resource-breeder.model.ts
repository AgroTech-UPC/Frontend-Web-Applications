import { Resource } from './resource.model';
import { Breeder } from './breeder.model';

export interface ResourceBreeder {
  breeders: Breeder;
  resources: Resource;
  quantity: any;
  date: any;
  observations: any;
}
