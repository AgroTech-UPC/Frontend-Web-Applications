import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { Router } from "@angular/router";
import {Client} from "../../models/client.model";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {ClientsApiService} from "../../services/clients-api/clients-api.service";

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    MatCardModule,
    NgForOf,
    MatButton
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {
  clients : Client[] = [];

  constructor(private clientsService: ClientsApiService, private router: Router) { }

  ngOnInit() {
    this.getAppointments();
  }

  getAppointments() {
    this.clientsService.getAppointments().subscribe((res: any) => {
      res.forEach((appointment: any) => {
        let appointmentData = new Client();
        appointmentData.id = appointment.id;
        appointmentData.date = appointment.date;
        appointmentData.status = appointment.status;
        appointmentData.breeder_name = appointment.breeders[0].users[0].fullname;
        this.clients.push(appointmentData);
      });
    });
  }

  getAppointment(id: any) {
    this.router.navigateByUrl(`/asesor/clientes/${id}`);
  }
}
