import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";
import {AdvisorApiService} from "../../../user/services/advisor-api.service";
import {FarmerApiService} from "../../../user/services/farmer-api.service";
import {AppointmentApiService} from "../../services/appointment-api.service";
import {AvailableDateApiService} from "../../services/available-date-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Advisor} from "../../../user/models/advisor.model";
import {AvailableDate} from "../../models/available_date.model";
import {Farmer} from "../../../user/models/farmer.model";
import {Appointment} from "../../models/appointment.model";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    NgIf
  ],
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.css'
})
export class BookAppointmentComponent implements OnInit {
  availableDates: AvailableDate[] = [];
  farmer!: Farmer;
  farmerId = 0;
  advisorId = 0;
  selectedDateIndex!: number;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private advisorApiService: AdvisorApiService,
    private farmerApiService: FarmerApiService,
    private appointmentApiService: AppointmentApiService,
    private availableDateApiService: AvailableDateApiService,
    private snackBar: MatSnackBar
  ){}


  ngOnInit() {
    this.farmerId = this.farmerApiService.getFarmerId();
    this.getAdvisor();
  }

  getAdvisor(): void {
    this.advisorId = this.activatedRouter.snapshot.params['id'];
    this.getAdvisorAvailableDates(this.advisorId); //called after getting advisor
  }

  getAdvisorAvailableDates(advisorId: number) {
    this.availableDateApiService.getAvailableDatesByAdvisorId(advisorId).subscribe(dates => {
      this.availableDates = dates;
      }, error => {
        console.log('Error fetching available dates:', error);
    });
  }

  createAppointment(): void {
    if (this.selectedDateIndex === undefined || this.selectedDateIndex < 0 || this.selectedDateIndex >= this.availableDates.length) {
      console.log('Índice de fecha seleccionada no válido');
      return;
    }

    let selectedDate = this.availableDates[this.selectedDateIndex];
    let newAppointment: Appointment = {
      id: 0,
      advisorId: this.advisorId,
      farmerId: this.farmerId,
      scheduledDate: selectedDate.availableDate,
      status: "PENDING", // TERMINADO, PENDIENTE
      message: '',
      startTime: selectedDate.startTime,
      endTime: selectedDate.endTime,
      meetingUrl: ''
    };

    this.appointmentApiService.create(newAppointment).subscribe(() => {
      this.availableDateApiService.delete(selectedDate.id,).subscribe(() => {
        this.snackBar.open('Cita reservada🤩', 'Cerrar', {
          duration: 2000
        });
        this.router.navigate(['/granjero/citas']);
      }, error => {
        console.log('Error deleting available date:', error);
      });
    }, error => {
      this.snackBar.open('Error al reservar la cita😥', 'Cerrar', {
        duration: 2000
      });
      console.log('Error creating appointment:', error);
    });
  }

  setSelectedDateIndex(index: number): void {
    this.selectedDateIndex = index;
  }

  goBack() {
    window.history.back();
  }
}
