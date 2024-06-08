import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AvailableDate} from "../../models/available_date.model";
import {MatCard, MatCardContent} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";


import { AdvisorApiService } from "../../../user/services/advisor-api.service";
import { AvailableDateApiService } from "../../services/available-date-api.service";
import {EmptyViewComponent} from "../../../public/components/empty-view/empty-view.component";
import {Notification} from "../../models/notification.model";

@Component({
  selector: 'app-list-availability-schedule',
  standalone: true,
    imports: [
        RouterLink,
        MatCard,
        MatCardContent,
        NgForOf,
        MatButton,
        EmptyViewComponent,
        NgIf
    ],
  templateUrl: './list-availability-schedule.component.html',
  styleUrl: './list-availability-schedule.component.css'
})
export class ListAvailabilityScheduleComponent implements OnInit{
  results: any[] = [];
  advisor_id = 0;

  constructor(private availableDateApiService: AvailableDateApiService,
              private advisorApiService: AdvisorApiService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.advisor_id = this.advisorApiService.getAdvisorId();
    this.getAvailableDates();
  }




  getAvailableDates() {
    this.advisorApiService.getAvailableDatesByAdvisorId(this.advisor_id).subscribe((availableDates: AvailableDate[]) => {
      availableDates.forEach((availableDate: AvailableDate) => {

        const dateParts = availableDate.date.split('-');
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

        // Split the time strings into [hours, minutes, seconds]
        const startTimeParts = availableDate.startTime.split(':');
        const endTimeParts = availableDate.endTime.split(':');

        // Get the hours and minutes parts
        const startTime = `${startTimeParts[0]}:${startTimeParts[1]}`;
        const endTime = `${endTimeParts[0]}:${endTimeParts[1]}`;

        this.results.push({
          id: availableDate.id,
          date: formattedDate,
          startTime: startTime,
          endTime: endTime,
          advisorId: availableDate.advisorId,
          status: availableDate.status
        });
      });
    }, (error) => {
      console.error(error);
    });
  }

  deleteDate(id: number) {
    this.availableDateApiService.delete(id).subscribe(() => {
      console.log("Horario disponible eliminado con éxito.");
      this.results = this.results.filter((availableDate: any) => availableDate.id !== id);
    }, (error) => {
      console.error("Error al eliminar el horario disponible:", error);
    });
  }

}
