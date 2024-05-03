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
export class ViewMyAdvisorsComponent implements OnInit{
  breederId = 1;
  advisors: Advisor[] = [];
  advisorHistories: AdvisorHistory[] = [];

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
        this.advisorHistories = advisorHistories;
      });
    });
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
}
