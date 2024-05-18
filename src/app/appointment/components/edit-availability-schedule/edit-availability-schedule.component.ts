import { Component, OnInit } from '@angular/core';

import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import { MatRadioModule } from '@angular/material/radio';

import {Advisor} from "../../../user/models/advisor.model";
import {AdvisorApiService} from "../../../user/services/advisor-api.service";

import {AvailableDate} from "../../models/available_date.model";

import {AvailableDateApiService} from "../../services/availabe-date-api.service";

import {NgForOf, DatePipe, NgIf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, FormGroup, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-edit-availability-schedule',
  templateUrl: './edit-availability-schedule.component.html',
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
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  styleUrls: ['./edit-availability-schedule.component.css']
})
export class EditAvailabilityScheduleComponent implements OnInit {
  form: FormGroup;
  advisor!: Advisor;
  advisorId!: number; // Add this line to store the advisorId
  advisor_availableDates: AvailableDate[] = [];

  constructor(
    private advisorApiService: AdvisorApiService, // Inject AdvisorApiService
    private availableDateApiService: AvailableDateApiService,
    private fb: FormBuilder
  ){
    this.form = this.fb.group({
      day: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.advisorId = this.advisorApiService.getAdvisorId(); // Get the advisorId from the service
    this.getAdvisor();
  }

  getAdvisor(): void {
    // Use the advisorId from the service instead of the route parameters
    this.advisorApiService.getOne(this.advisorId).subscribe(advisor => {
      this.advisor = advisor;
      this.getAdvisorAvailableDates(); //called after getting advisor
    });
  }

  getAdvisorAvailableDates(): void {
    this.availableDateApiService.getAll().subscribe(dates => {
        dates = dates.filter(date => date.advisor_id === this.advisor.id && date.status === 1);
        this.advisor_availableDates = dates;
      }
    )
  }

  addAvailableDate(): void {
    const { day, startTime, endTime } = this.form.value;

    const newDate: AvailableDate = {
      id: Date.now(), // generate a unique ID
      advisor_id: this.advisor.id,
      advisor: this.advisor, // add this line
      day: day,
      start_time: startTime,
      end_time: endTime,
      status: 1
    };

    this.availableDateApiService.create(newDate).subscribe();
  }


}
