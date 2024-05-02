import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

import {AvailableDate} from "../../models/available_date";

@Injectable({
  providedIn: 'root'
})
export class AvailabeDateApiService {
  baseUrl: string = environment.baseURL;
  constructor(private http: HttpClient) { }

  getAvailableDates(){
    return this.http.get<AvailableDate[]>(`${this.baseUrl}/available_dates`);
  }
  getAvailableDate(id: any){
    return this.http.get<AvailableDate>(`${this.baseUrl}/available_dates/${id}`);
  }

  getAvailableDatesByAdvisorId(advisorId: any){
    return this.http.get<AvailableDate[]>(`${this.baseUrl}/available_dates?advisor_id=${advisorId}`);
  }

  setStatusDate(id: any, status: any){
    return this.http.patch<AvailableDate>(`${this.baseUrl}/available_dates/${id}`, {status: status});
  }
}
