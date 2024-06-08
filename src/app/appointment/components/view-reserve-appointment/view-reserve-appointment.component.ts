import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import { MatRadioModule } from '@angular/material/radio';

import {Advisor} from "../../../user/models/advisor.model";
import {AdvisorApiService} from "../../../user/services/advisor-api.service";

import {AvailableDate} from "../../models/available_date.model";

import {Breeder} from "../../../user/models/breeder.model";
import {BreederApiService} from "../../../user/services/breeder-api.service";

import {Appointment} from "../../models/appointment.model";
import {AppointmentApiService} from "../../services/appointment-api.service";

import {AvailableDateApiService} from "../../services/available-date-api.service";

import {NgForOf, DatePipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-view-reserve-appointment',
  standalone: true,
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    NgForOf,
    DatePipe,
    NgIf
  ],
  templateUrl: './view-reserve-appointment.component.html',
  styleUrl: './view-reserve-appointment.component.css'
})
export class ViewReserveAppointmentComponent implements OnInit {
  showMessage = false;
  showConfirmation: boolean = false;

  advisor!: Advisor;
  advisor_availableDates: AvailableDate[] = [];
  breeder!: Breeder;
  breeder_id = 0;
  selectedDateIndex!: number;
  appointmentId = 0;
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private advisorApiService: AdvisorApiService,
    private breederApiService: BreederApiService,
    private appointmentApiService: AppointmentApiService,
    private availableDateApiService: AvailableDateApiService
  ){}

  ngOnInit(): void {
    this.breeder_id = this.breederApiService.getBreederId();
    this.getAdvisor();
    this.getBreeder();
  }

  getAdvisor(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.advisorApiService.getOne(id).subscribe(advisor => {
      this.advisor = advisor;
      this.getAdvisorAvailableDates(); //called after getting advisor
    });

  }
  getAdvisorAvailableDates(): void {
    this.availableDateApiService.getAll().subscribe(dates => {
        dates = dates.filter(date => date.advisorId === this.advisor.id && date.status === true);
        this.advisor_availableDates = dates;
        console.log("Horarios: ",this.advisor_availableDates);
      }
    )
  }
  getBreeder(): void {
    this.breederApiService.getOne(this.breeder_id).subscribe(breeder => this.breeder = breeder);
  }

  setSelectedDateIndex(index: number): void {
    this.selectedDateIndex = index;
  }

  createAppointment(): void{
    if (this.selectedDateIndex === undefined || this.selectedDateIndex < 0 || this.selectedDateIndex >= this.advisor_availableDates.length) {
      console.error('Índice de fecha seleccionada no válido');
      return;
    }

    let selectedDate = this.advisor_availableDates[this.selectedDateIndex];
    let appointmentDate = new Date(`${selectedDate.date}T${selectedDate.startTime}`);
    let newAppointment: Appointment = {
      id: this.appointmentId,
      advisorId: this.advisor.id,
      breederId: this.breeder.id,
      date: appointmentDate,
      status: "PENDIENTE" // TERMINADO, PENDIENTE
  };

    this.appointmentApiService.create(newAppointment).subscribe(() => {
      this.showConfirmation = true;
      selectedDate.status = 0;
      this.availableDateApiService.update(selectedDate.id, selectedDate).subscribe(() => {
        this.getAdvisorAvailableDates();
      });
    });
  }

  // Status 1: Disponible, Status 0: No disponible
  getStatusText(status: boolean): string {
    return status === true ? 'Disponible' : 'No disponible';
  }

  goHome(): void {
    this.router.navigate(['criador/buscar-asesor']);
  }
  cancel(): void{
    this.router.navigate(['criador/buscar-asesor']);
  }
}
