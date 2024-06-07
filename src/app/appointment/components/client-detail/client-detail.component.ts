import {Component, OnInit} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {ActivatedRoute} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {DatePipe} from "@angular/common";
import {Breeder} from "../../../user/models/breeder.model";
import {BreederApiService} from "../../../user/services/breeder-api.service";
import {AppointmentApiService} from "../../services/appointment-api.service";
import {Appointment} from "../../models/appointment.model";
import {Client} from "../../models/client.model";
import {UserApiService} from "../../../user/services/user-api.service";
import {CageApiService} from "../../../management/services/cage-api.service";

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
export class ClientDetailComponent implements OnInit{
  breeder!: Breeder;
  appointment: Appointment = {
    id: 0,
    advisor_id: 0,
    breeder_id: 0,
    date: '',
    status: '',
  }

  client: Client = {
    id: 0,
    appointment_id: 0,
    fullname: '',
    appointment_status: '',
    location: '',
    cages: 0,
    description: ''
  }
  appointment_id = 0;

  constructor(private breederService: BreederApiService,
              private userService: UserApiService,
              private appointmentService: AppointmentApiService,
              private cageService: CageApiService,
              private activatedRouter: ActivatedRoute) {}

  ngOnInit() {
    this.appointment_id = this.activatedRouter.snapshot.params['id'];
    this.getAppointment();
  }

  getClient(breeder_id: number) {
    this.breederService.getOne(breeder_id).subscribe((breeder: Breeder) => {
      this.breeder = breeder;
      this.userService.getOne(breeder.userId).subscribe(user => {
        this.cageService.getAll().subscribe(cages => {
          this.client = {
            id: breeder_id,
            appointment_id: this.appointment_id,
            fullname: user.fullname,
            appointment_status: this.appointment.status,
            location: user.location,
            cages: cages.filter(cage => cage.breeder_id === breeder_id).length,
            description: user.description
          }
        })
      });
    });
  }

  getAppointment() {
    this.appointmentService.getOne(this.appointment_id).subscribe((appointment: Appointment) => {
      this.appointment = appointment;
      this.getClient(appointment.breeder_id);
    });
  }

  goBack() {
    window.history.back();
  }

}
