import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Review} from "../../models/review.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";

import {Advisor} from "../../models/advisor.model";
import {Appointment} from "../../models/appointment.model";
import {AdvisorApiService} from "../../services/advisor-api/advisor-api.service";
import {AppointmentApiService} from "../../services/appointment-api/appointment-api.service";
import {ReviewApiService} from "../../services/review-api/review-api.service";

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    FormsModule, MatButton, MatFormField, MatInput, MatLabel,
    ReactiveFormsModule, MatIcon, NgForOf, NgIf,
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {
  breederId = 1;
  isConfirmed: boolean = false;
  advisor!: Advisor;
  appointment!: Appointment;

  rating: number = 0;
  stars: boolean[] = Array(5).fill(false);

  review: Review = {
    id: 0,
    appointment_id: 0,
    comment: "",
    rating: 0
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private advisorService: AdvisorApiService,
    private appointmentService: AppointmentApiService,
    private reviewService: ReviewApiService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.review.appointment_id = params['id'];

      const appointmentId = params['id'];
      this.getAppointment(appointmentId);
    });
  }

  getAppointment(appointmentId: string): void {
    this.appointmentService.getAppointment(appointmentId).subscribe(appointment => {
      this.appointment = appointment;
      this.getAdvisor();
    });
  }

  getAdvisor(): void {
    const advisorId = this.appointment.advisor_id;
    this.advisorService.getAdvisor(advisorId).subscribe(advisor => {
      this.advisor = advisor;
      console.log(this.advisor)
    });
  }
  onSubmit() {
    this.review.rating = this.rating;
    this.review.appointment_id = this.appointment.id;

    this.reviewService.getHighestReviewId().subscribe(highestId => {
      this.review.id = highestId + 1;
      this.reviewService.addReview(this.review).subscribe();
      this.isConfirmed = true;
    });

  }
  goHome(){
    this.isConfirmed = false;
    this.router.navigate(['/criador/mis-asesores']);
  }
  onCancel(){
    this.isConfirmed = false;
    this.router.navigate(['/criador/mis-asesores']);

  }

  // CALIFICACION POR ESTRELLAS
  onStarClick(index: number): void {
    this.rating = index + 1;
    this.updateStars();
  }
  updateStars(): void {
    this.stars.fill(false);
    this.stars.fill(true, 0, this.rating);
  }

}