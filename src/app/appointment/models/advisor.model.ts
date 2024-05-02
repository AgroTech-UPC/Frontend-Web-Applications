import { User } from './user.model';

export interface Advisor{
  id: number;
  occupation: any;
  experience: any;
  photo: any;
  rating: any;
  users: User[];
}
