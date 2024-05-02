import { User } from '../../user/models/user.model';

export interface Notification {
  id: any;
  type: any;
  text: any;
  date: any;
  users: User;
}