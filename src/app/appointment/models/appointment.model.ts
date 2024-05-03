import { Breeder } from './breeder.model';

export interface Appointment {
  "id": number;
  "advisor_id": number;
  "breeder_id": number;
  "breeders": Breeder[];
  "date": any;
  "status": any;
}
