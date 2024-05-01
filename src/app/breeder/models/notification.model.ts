import { User } from './user.model';

export interface Notification {
  id: any;
  type: any;
  text: any;
  date: any;
  users: User;
}
