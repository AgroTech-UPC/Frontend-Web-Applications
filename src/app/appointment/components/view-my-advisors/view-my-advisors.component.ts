import { Component, OnInit } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

import {Advisor} from "../../models/advisor.model";
import {AdvisorApiService} from "../../services/advisor-api/advisor-api.service";

import {Breeder} from "../../models/breeder.model";
import {BreederApiService} from "../../../user/services/breeder-api.service";
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
export class ViewMyAdvisorsComponent {
  advisors: Advisor[] = [];
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
    const breederId = this.route.snapshot.paramMap.get('id_criador');
    if (breederId === null) {
      console.error('Breeder ID is null');
      return;
    }
    this.advisorApiService.getBreederAppointments(breederId).subscribe(appointments => {
      const breederAppointments = appointments.filter(appointment => appointment.breeder_id === +breederId);
      const advisorIds = breederAppointments.map(appointment => appointment.advisor_id);
      const advisorHistoryObservables = advisorIds.map(id =>
        forkJoin({
          advisor: this.advisorApiService.getAdvisor(id),
          appointments: of(breederAppointments.filter(appointment => appointment.advisor_id === id))
        })
      );
      forkJoin(advisorHistoryObservables).subscribe(advisorHistories => {
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
    const id_criador = this.route.snapshot.paramMap.get('id_criador');
    this.router.navigate([`criador/${id_criador}/buscar-asesor`]);
  }
  navigateToMyAdvisors() {
    const id_criador = this.route.snapshot.paramMap.get('id_criador');
    this.router.navigate([`criador/${id_criador}/mis-asesores`]);
  }
}
