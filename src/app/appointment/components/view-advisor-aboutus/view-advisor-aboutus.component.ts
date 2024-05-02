import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

import {Advisor} from "../../models/advisor.model";
import {AdvisorApiService} from "../../services/advisor-api/advisor-api.service";
import {NgForOf, NgIf} from "@angular/common";

import {ReviewApiService} from "../../services/review-api/review-api.service";
import {Review} from "../../models/review.model";

@Component({
  selector: 'app-view-advisor-aboutus',
  standalone: true,
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './view-advisor-aboutus.component.html',
  styleUrl: './view-advisor-aboutus.component.css'
})
export class ViewAdvisorAboutusComponent {
  advisor!: Advisor;
  reviews: Review[] = [];
  constructor(
    private advisorApiService: AdvisorApiService,
    private router: Router,
    private route: ActivatedRoute,
    private reviewApiService: ReviewApiService
  ){}

  ngOnInit(): void {
    this.getAdvisor();

    this.getAdvisorReviews();
  }

  getAdvisor(): void {
    const id = this.route.snapshot.paramMap.get('id_asesor');
    this.advisorApiService.getAdvisor(id).subscribe(advisor => this.advisor = advisor);
  }

  getAdvisorReviews(): void {
    const id = this.route.snapshot.paramMap.get('id_asesor');
    this.reviewApiService.getAdvisorReviews(id).subscribe(reviews => this.reviews = reviews);
  }

  NavigateToReserveAppointment(): void {
    const id_criador = this.route.snapshot.paramMap.get('id_criador');
    const id_asesor = this.advisor.id;
    this.router.navigate([`/criador/${id_criador}/asesor-info/${id_asesor}/reservar-cita`]);
  }
}
