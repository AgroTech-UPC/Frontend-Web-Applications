import {Component} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ClientsApiService } from "../../services/clients-api/clients-api.service";
import {ActivatedRoute} from "@angular/router";
import {Client} from "../../models/client.model";
import {MatButton} from "@angular/material/button";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatButton,
    DatePipe
  ],
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.css'
})
export class ClientDetailComponent {
  client = new Client();

  constructor(private clientsService: ClientsApiService, private activatedRouter: ActivatedRoute) {
    this.activatedRouter.params.subscribe(
      params => {
        this.getAppointment(params['id']);
      }
    );
  }

  getAppointment(id: any) {
    this.clientsService.getAppointment(id).subscribe((res: any) => {
      this.client.id = res.id;
      this.client.date = res.date;
      this.client.status = res.status;
      this.client.breeder_name = res.breeders[0].users[0].fullname;
      this.client.location = res.breeders[0].users[0].location;
    });
  }

  goBack() {
    window.history.back();
  }

}
