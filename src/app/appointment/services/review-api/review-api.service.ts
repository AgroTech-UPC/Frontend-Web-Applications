import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

import {Review} from "../../models/review.model";
import {AppointmentApiService} from "../appointment-api/appointment-api.service";
import {Appointment} from "../../models/appointment.model";
import {map, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReviewApiService {
  baseUrl: string = environment.baseURL;
  constructor(private http: HttpClient) { }

  getReviews(){
    return this.http.get<Review[]>(`${this.baseUrl}/reviews`);
  }
  getReview(id: any){
    return this.http.get<Review>(`${this.baseUrl}/reviews/${id}`);
  }

  getAdvisorReviews(advisorId: any) {
    let advisorIdNumber = Number(advisorId);
    return this.http.get<Review[]>(`${this.baseUrl}/reviews`).pipe(
      switchMap(reviews => {
        return this.http.get<Appointment[]>(`${this.baseUrl}/appointments`).pipe(
          map(appointments => {
            let advisorAppointments = appointments.filter(appointment => appointment.advisor_id === advisorIdNumber);
            if (!advisorAppointments.length) {
              return [];
            }
            let advisorAppointmentIds = advisorAppointments.map(appointment => appointment.id);
            let advisorReviews = reviews.filter(review => advisorAppointmentIds.includes(review.appointment_id));
            return advisorReviews;
          })
        );
      })
    );
  }

  addReview(review: Review){
    return this.http.post<Review>(`${this.baseUrl}/reviews`, review);
  }
  getHighestReviewId() {
    return this.http.get<Review[]>(`${this.baseUrl}/reviews`).pipe(
      map(reviews => Math.max(...reviews.map(review => review.id)))
    );
  }
}
