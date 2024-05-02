import { Breeder } from '../../user/models/breeder.model';
export interface Expense {
  id: any;
  breeders: Breeder;
  type: any;
  amount: any;
  date: any;
  description: any;
}
