import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AvailableDate} from "../../models/available_date.model";
import {MatCard, MatCardContent} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

import { AdvisorApiService } from "../../../user/services/advisor-api.service";
import { AvailableDateApiService } from "../../services/available-date-api.service";


@Component({
  selector: 'app-list-availability-schedule',
  standalone: true,
  imports: [
    RouterLink,
    MatCard,
    MatCardContent,
    NgForOf,
    MatButton
  ],
  templateUrl: './list-availability-schedule.component.html',
  styleUrl: './list-availability-schedule.component.css'
})
export class ListAvailabilityScheduleComponent implements OnInit{
  availableDates: AvailableDate[] =  [];

  constructor
  (
    private availableDateApiService: AvailableDateApiService,
    private advisorApiService: AdvisorApiService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getMyAvailableDates();
  }

  getMyAvailableDates() {
    const advisorId = this.advisorApiService.getAdvisorId(); // Obtiene el id del advisor

    this.availableDateApiService.getAll().subscribe((availableDates) => {
      this.availableDates = availableDates.filter(date => date.advisor_id === advisorId && date.status === 1);
    });
  }

  deleteDate(id: number) {
    this.availableDateApiService.delete(id).subscribe(() => {
      console.log("Available date deleted successfully");
      this.snackBar.open('El horario ha sido eliminado exitosamente.', 'Cerrar', {
        duration: 2000,
      });
      this.getMyAvailableDates(); //Actualizar lista de horarios
    }, error => {
      console.log("Error deleting available date");
    });
  }

}
