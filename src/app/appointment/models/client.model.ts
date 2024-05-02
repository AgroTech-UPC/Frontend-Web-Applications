export class Client {
  id: string;
  date: string;
  breeder_name: string;
  status: string;
  location: string;
  constructor(id='', date='', breeder_name='', name='', status='', location ='') {
    this.id = id;
    this.date = date;
    this.breeder_name = breeder_name;
    this.status = status;
    this.location = location;
  }
}
