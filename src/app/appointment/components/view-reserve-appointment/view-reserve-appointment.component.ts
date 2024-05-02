import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import { MatRadioModule } from '@angular/material/radio';

import {Advisor} from "../../models/advisor.model";
import {AdvisorApiService} from "../../services/advisor-api/advisor-api.service";

import {AvailableDate} from "../../models/available_date";

import {Breeder} from "../../models/breeder.model";
import {BreederApiService} from "../../services/breeder-api/breeder-api.service";

import {Appointment} from "../../models/appointment.model";
import {AppointmentApiService} from "../../services/appointment-api/appointment-api.service";

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
export class ViewReserveAppointmentComponent {
  advisor!: Advisor;
  advisor_availableDates: AvailableDate[] = [];
  breeder!: Breeder;
  showConfirmation: boolean = false;
  selectedDateIndex!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private advisorApiService: AdvisorApiService,
    private breederApiService: BreederApiService,
    private appointmentApiService: AppointmentApiService,
    private datePipe: DatePipe
  ){}

  ngOnInit(): void {
    this.getAdvisor();
    this.getAdvisorAvailableDates();
    this.getBreeder();
  }

  getAdvisor(): void {
    const id = this.route.snapshot.paramMap.get('id_asesor');
    this.advisorApiService.getAdvisor(id).subscribe(advisor => this.advisor = advisor);
  }
  getAdvisorAvailableDates(): void {
    const id_asesor = this.route.snapshot.paramMap.get('id_asesor');
    this.advisorApiService.getAdvisorAvailableDates(id_asesor).subscribe(dates => {
      this.advisor_availableDates = dates;
    });
  }
  getBreeder(): void {
    const id = this.route.snapshot.paramMap.get('id_criador');
    this.breederApiService.getBreeder(id).subscribe(breeder => this.breeder = breeder);
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
    let appointmentDate = new Date(selectedDate.day.split("/").reverse().join("-") + 'T' + selectedDate.start_time + ':00');

    let advisorId = this.advisor.id;
    let breederId = this.breeder.id;
    let breederObj = this.breeder;

    this.appointmentApiService.getHighestId().subscribe(highestId => {
      let newAppointmentId = highestId + 1;
      let appointmentId = newAppointmentId;
      let appointmentStatus = "Pendiente";

      let newAppointment: Appointment = {
        id: appointmentId,
        advisor_id: advisorId,
        breeder_id: breederId,
        breeders: [breederObj],
        date: appointmentDate,
        status: appointmentStatus
      };

      this.appointmentApiService.addAppointment(newAppointment).subscribe(() => {
        console.log('Cita creada con éxito');
        this.showConfirmation = true;
      });
    });
  }

  // SOLO SON PARA CAMBIAR EL FORMATO DEL DATE Y EL STATUS:

  getStatusText(status: number): string {
    return status === 1 ? 'Disponible' : 'No disponible';
  }

  goHome(): void {
    const id_criador = this.route.snapshot.paramMap.get('id_criador');
    this.router.navigate(['criador/' + id_criador + '/buscar-asesor']);
  }
  cancelar(): void{
    const id_criador = this.route.snapshot.paramMap.get('id_criador');
    this.router.navigate(['criador/' + id_criador + '/buscar-asesor']);
  }
}
