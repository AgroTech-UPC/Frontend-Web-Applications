import {Component, Input, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import { Router } from "@angular/router";
import {BreederApiService} from "../../../user/services/breeder-api.service";
import {AppointmentApiService} from "../../services/appointment-api.service";
import {Appointment} from "../../models/appointment.model";
import {UserApiService} from "../../../user/services/user-api.service";
import {Client} from "../../models/client.model";

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

  constructor(private router: Router) { }

  goToAppointment(id: any) {
    this.router.navigateByUrl(`/asesor/clientes/${id}`);
  }
}
