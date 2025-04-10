import {Component, OnInit} from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle} from "@angular/material/card";
import {AppointmentApiService} from "../../services/appointment-api.service";
import {AdvisorApiService} from "../../../user/services/advisor-api.service";
import {ProfileApiService} from "../../../profile/services/profile-api.service";
import {Appointment} from "../../models/appointment.model";
import {ActivatedRoute} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {UserApiService} from "../../../user/services/user-api.service";
import {FarmerApiService} from "../../../user/services/farmer-api.service";

@Component({
  selector: 'app-appointment-detail',
  standalone: true,
  imports: [
    DatePipe,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    MatIconButton,
    MatIcon,
    NgIf
  ],
  templateUrl: './appointment-detail.component.html',
  styleUrl: './appointment-detail.component.css'
})
export class AppointmentDetailComponent implements OnInit {

  appointmentId = 0;
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
  };
  profileInfo = {
    fullname: '',
    photo: ''
  };
  isFarmer = false;

  constructor(private appointmentApiService: AppointmentApiService,
              private advisorApiService: AdvisorApiService,
              private farmerApiService: FarmerApiService,
              private profileApiService: ProfileApiService,
              private userApiService: UserApiService,
              private activatedRoute: ActivatedRoute) {
  }

  async ngOnInit() {
    this.isFarmer = this.userApiService.getIsFarmer();
    this.appointmentId = this.activatedRoute.snapshot.params['id'];
    this.getAppointment();
  }

  getAppointment() {
    if (this.isFarmer) {
      this.appointmentApiService.getOne(this.appointmentId).subscribe((appointment) => {
        this.appointment = appointment;
        this.advisorApiService.getOne(appointment.advisorId).subscribe((advisor) => {
          this.profileApiService.getProfileByUserId(advisor.userId).subscribe((profile) => {
            this.profileInfo.fullname = profile.firstName + ' ' + profile.lastName;
            this.profileInfo.photo = profile.photo;
          });
        });
      });
    } else {
      this.appointmentApiService.getOne(this.appointmentId).subscribe((appointment) => {
        this.appointment = appointment;
        this.farmerApiService.getOne(appointment.farmerId).subscribe((farmer) => {
          this.profileApiService.getProfileByUserId(farmer.userId).subscribe((profile) => {
            this.profileInfo.fullname = profile.firstName + ' ' + profile.lastName;
            this.profileInfo.photo = profile.photo;
          });
        });
      });
    }
  }

  formatDate(dateTime: string): string {
    const date = new Date(dateTime);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript comienzan desde 0
    // pasar a texto el mes
    const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const monthText = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} de ${monthText} de ${year}`;
  }

  goBack() {
    window.history.back();
  }


}
