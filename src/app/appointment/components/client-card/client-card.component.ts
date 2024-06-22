import {Component, Input, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import { Router } from "@angular/router";
import {Client} from "../../models/client.model";
import {AppointmentApiService} from "../../services/appointment-api.service";
import {Appointment} from "../../models/appointment.model";

@Component({
  selector: 'client-card',
  standalone: true,
    imports: [
        MatButton,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardTitle
    ],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.css'
})
export class ClientCardComponent {
  @Input() client!: Client;

  constructor(private router: Router, private appointmentService: AppointmentApiService) { }

  goToAppointment(id: any) {
    this.router.navigateByUrl(`/asesor/clientes/${id}`);
  }
  finishAppointment() {
    this.appointmentService.getOne(this.client.appointmentId).subscribe((appointment: Appointment) => {
      appointment.status = "TERMINADO";
      this.appointmentService.update(appointment.id, appointment).subscribe(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([decodeURI(this.router.url)]);
        });
      });
    });
  }
}
