import { Component, OnInit } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

import {AdvisorApiService} from "../../../user/services/advisor-api.service";
import {Router} from "@angular/router";

import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {AppointmentApiService} from "../../services/appointment-api.service";
import {UserApiService} from "../../../user/services/user-api.service";
import {Advisor} from "../../../user/models/advisor.model";
import {Appointment} from "../../models/appointment.model";
import {BreederApiService} from "../../../user/services/breeder-api.service";

@Component({
  selector: 'app-view-my-advisors',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    NgForOf,
    NgIf
  ],
  templateUrl: './view-my-advisors.component.html',
  styleUrl: './view-my-advisors.component.css'
})
export class ViewMyAdvisorsComponent implements OnInit{
  breederId = 0;
  searchValue = '';
  advisors: Advisor[] = [];
  filteredAdvisors: Advisor[] = [];
  appointmentsPerAdvisor: Appointment[][] = []; //contains all the appointments of each advisor
  advisorDetails: any = {};

  constructor(
    private breederApiService: BreederApiService,
    private advisorApiService: AdvisorApiService,
    private appointmentApiService: AppointmentApiService,
    private userApiService: UserApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.breederId = this.breederApiService.getBreederId();
    this.getMyAdvisors();
  }

  getAppointmentsByAdvisor(advisor_id: number): Appointment[] {
    return this.appointmentsPerAdvisor[advisor_id] || [];
  }

  getMyAdvisors(): void {
    this.advisorApiService.getAll().subscribe(advisors => {
      this.advisors = advisors;
      this.appointmentApiService.getAll().subscribe(appointments => {
        let advisorAppointments: Appointment[][] = []; // Initialize as array of arrays
        this.advisors.forEach(advisor => {
          // Push the filtered appointments into the corresponding sub-array
          advisorAppointments[advisor.id - 1] = appointments.filter(appointment => appointment.advisor_id === advisor.id &&
            appointment.breeder_id === this.breederId);
        });
        //if advisorAppointments[advisor.id - 1] is empty, then the advisor has no appointments with the breeder
        // and has to be removed from the list of advisors
        this.advisors = this.advisors.filter(advisor => advisorAppointments[advisor.id - 1].length > 0);

        this.filteredAdvisors = [...this.advisors];
        this.filteredAdvisors.forEach(advisor => {
          this.userApiService.getOne(advisor.userId).subscribe(user => {
            this.advisorDetails[advisor.userId] = {
              fullname: user.fullname,
              location: user.location
            };
          });
        });
        //Get all appointments for each advisor in an array
        this.filteredAdvisors.forEach(advisor => {
          this.appointmentsPerAdvisor[advisor.id] = appointments.filter(appointment => appointment.advisor_id === advisor.id
            && appointment.breeder_id === this.breederId);
        });
      });
    });
  }

  filter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchValue = inputElement.value.replace(/[^a-zA-Z ]/g, '');

    if (this.searchValue === '') {
      this.filteredAdvisors = this.advisors;
    } else {
        this.filteredAdvisors = this.advisors.filter(advisor => {
          return this.advisorDetails[advisor.userId]?.fullname.toLowerCase().includes(this.searchValue.toLowerCase());
        }
      );
    }
  }

  // BOTONES REDIRECCIONAR:
  navigateToAdvisorsSearch() {
    this.router.navigate([`/criador/buscar-asesor`]);
  }
  navigateToMyAdvisors() {
    this.router.navigate([`/criador/mis-asesores`]);
  }

  giveReview(id: number){
    this.router.navigate([`/criador/mis-asesores/${id}`]);
  }

  formatDateTime(dateTime: string): string {
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript comienzan desde 0
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

}
