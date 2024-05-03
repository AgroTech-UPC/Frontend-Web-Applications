import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

import {Advisor} from "../../models/advisor.model";
import {AvailabeDateApiService} from "../available_date-api/availabe-date-api.service";

import {Observable} from "rxjs";
import {Appointment} from "../../models/appointment.model";

@Injectable({
  providedIn: 'root'
})
export class AdvisorApiService {
  baseUrl: string = environment.baseURL;
  constructor(
    private http: HttpClient,
    private availableDateApiService: AvailabeDateApiService
  ) { }

  getAdvisors(){
    return this.http.get<Advisor[]>(`${this.baseUrl}/advisors`);
  }
  getAdvisor(id: any){
    return this.http.get<Advisor>(`${this.baseUrl}/advisors/${id}`);
  }

  getAdvisorAvailableDates(advisorId: any){
    return this.availableDateApiService.getAvailableDatesByAdvisorId(advisorId);
  }

  getBreederAppointments(breederId: any): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments?breeder_id=${breederId}`);
  }
}
