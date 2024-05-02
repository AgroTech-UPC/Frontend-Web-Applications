export class Publication {
  id: string;
  advisor_id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  is_active: boolean;
  constructor(id ='', advisor_id='', title='', description='', date='', image ='', is_active=false) {
    this.id = id;
    this.advisor_id = advisor_id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.image = image;
    this.is_active = is_active;
  }
}
