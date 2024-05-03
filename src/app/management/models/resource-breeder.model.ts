import { Resource } from './resource.model';
import { Breeder } from '../../user/models/breeder.model';

export interface ResourceBreeder {
  breeders: Breeder;
  resources: Resource;
  quantity: any;
  date: any;
  observations: any;
}
