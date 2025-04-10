import {Component, OnInit} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {ActivatedRoute} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {DatePipe} from "@angular/common";
import {Farmer} from "../../../user/models/farmer.model";
import {FarmerApiService} from "../../../user/services/farmer-api.service";
import {AppointmentApiService} from "../../services/appointment-api.service";
import {Appointment} from "../../models/appointment.model";
import {Client} from "../../models/client.model";

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
  breeder!: Farmer;
  appointment: Appointment = {
    id: 0,
    advisorId: 0,
    farmerId: 0,
    scheduledDate: '',
    status: '',
    startTime: '',
    endTime: '',
    meetingUrl: '',
    message: ''
  }

  client: Client = {
    id: 0,
    appointmentId: 0,
    appointmentStatus: '',
    fullname: '',
    location: '',
    cages: 0,
    description: ''
  }
  appointmentId = 0;

  constructor(private breederService: FarmerApiService,
              private appointmentService: AppointmentApiService,
              private activatedRouter: ActivatedRoute) {}

  ngOnInit() {
    this.appointmentId = this.activatedRouter.snapshot.params['id'];
    this.getAppointment();
  }

  getClient(breederId: number) {
    this.breederService.getOne(breederId).subscribe((breeder: Farmer) => {
      this.breeder = breeder;
    });
  }

  getAppointment() {
    this.appointmentService.getOne(this.appointmentId).subscribe((appointment: Appointment) => {
      this.appointment = appointment;
      this.getClient(appointment.farmerId);
    });
  }

  goBack() {
    window.history.back();
  }

}
