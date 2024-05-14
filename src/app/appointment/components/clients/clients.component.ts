import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { Router } from "@angular/router";

import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {AdvisorApiService} from "../../../user/services/advisor-api.service";
import {BreederApiService} from "../../../user/services/breeder-api.service";
import {AppointmentApiService} from "../../services/appointment-api.service";
import {Appointment} from "../../models/appointment.model";
import {UserApiService} from "../../../user/services/user-api.service";
import {Client} from "../../models/client.model";

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
  advisor_id = 1; //hard coded
  appointments: Appointment[] = [];
  clients: Client[] = [];

  constructor( private userService: UserApiService,
              private breederService: BreederApiService,
              private appointmentService: AppointmentApiService,
              private router: Router) { }

  ngOnInit() {
    this.getAppointments();
  }

  getAppointments() {
    this.appointmentService.getAll().subscribe(appointments => {
      appointments.filter(appointment => appointment.advisor_id === this.advisor_id).forEach(appointment => {
        this.appointments.push(appointment);
      });
      this.getClients();
    });
  }

  getClients(){
    this.appointments.forEach(appointment => {
      this.breederService.getOne(appointment.breeder_id).subscribe(breeder => {
        this.userService.getOne(breeder.user_id).subscribe(user => {
          let client = {
            id: breeder.id,
            appointment_id: appointment.id,
            fullname: user.fullname,
            appointment_status: appointment.status,
            location: user.location
          }
          this.clients.push(client);
        });

      });
    });
  }

  goToAppointment(id: any) {
    this.router.navigateByUrl(`/asesor/clientes/${id}`);
  }
}
