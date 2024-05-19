export class User {
  id: number;
  email: string;
  password: string;
  fullname: string;
  location: string;
  birthdate: string;
  description: string;

  constructor(id: number = 0, email: string = '', password: string = '', fullname: string = '', location: string = '', birthdate: string = '', description: string = '') {
    this.id = id;
    this.email = email;
    this.password = password;
    this.fullname = fullname;
    this.location = location;
    this.birthdate = birthdate;
    this.description = description;
  }
}
