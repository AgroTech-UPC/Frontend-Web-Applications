export class Notification {
  id: string;
  type: string;
  text: string;
  date: string;
  user_id: string;
  constructor(id='', type='', text='', date='', user_id='') {
    this.id = id;
    this.type = type;
    this.text = text;
    this.date = date;
    this.user_id = user_id;
  }
}
