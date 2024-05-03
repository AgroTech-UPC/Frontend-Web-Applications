import { Component, OnInit } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

import {AdvisorApiService} from "../../services/advisor-api/advisor-api.service";

import {ActivatedRoute, Router} from "@angular/router";
import {AdvisorHistory} from "../../models/advisor_history";
import {of} from 'rxjs';

import { forkJoin } from 'rxjs';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {NgForOf} from "@angular/common";

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
    NgForOf
  ],
  templateUrl: './view-my-advisors.component.html',
  styleUrl: './view-my-advisors.component.css'
})
export class ViewMyAdvisorsComponent implements OnInit{
  breederId = 1;
  searchValue = '';
  advisorHistories: AdvisorHistory[] = [];
  filteredAdvisorHistories: AdvisorHistory[] = [];

  constructor(
    private advisorApiService: AdvisorApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getMyAdvisors();
  }

  getMyAdvisors(): void {
    this.advisorApiService.getBreederAppointments(this.breederId).subscribe(appointments => {
      console.log(appointments);
      const advisorIds = appointments.map(appointment => appointment.advisor_id);
      console.log(advisorIds);
      const advisorHistoryObservables = advisorIds.map(id =>
        forkJoin({
          advisor: this.advisorApiService.getAdvisor(id),
          appointments: of(appointments.filter(appointment => appointment.advisor_id === id))
        })
      );
      forkJoin(advisorHistoryObservables).subscribe(advisorHistories => {
        console.log(advisorHistories);
        this.advisorHistories = advisorHistories;
        this.filteredAdvisorHistories = [...advisorHistories];
      });
    });
  }

  filter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchValue = inputElement.value.replace(/[^a-zA-Z ]/g, '');

    if (this.searchValue === '') {
      this.filteredAdvisorHistories = this.advisorHistories;
    } else {
      this.filteredAdvisorHistories = this.advisorHistories.filter(advisorHistory =>
        advisorHistory.advisor.users[0].fullname.toLowerCase().includes(this.searchValue.toLowerCase())
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
