import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

//Import the breeder model
import {Farmer} from "../models/farmer.model";
import {BaseService} from "../../shared/services/base.service";
import {catchError, Observable} from "rxjs";
import {Expense} from "../../management/models/expense.model";
import {Resource} from "../../management/models/resource.model";
import {Cage} from "../../management/models/cage.model";
import {Appointment} from "../../appointment/models/appointment.model";

@Injectable({
  providedIn: 'root'
})
export class FarmerApiService extends  BaseService<Farmer>{
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.farmerURL;
  }

  setFarmerId(farmerId: number) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('farmer_id', farmerId.toString());
    }
  }

  getFarmerId(): number {
    if (typeof window !== 'undefined' && window.localStorage) {
      const farmerId = localStorage.getItem('farmer_id');
      return farmerId ? parseInt(farmerId) : 0;
    }
    return 0;
  }

  getAppointmentsByFarmerId(farmerId: number) {
    this.setToken();
    return this.http.get<Appointment[]>(this.buildPath() + '/' + farmerId + '/appointments', this.httpOptions).pipe(catchError(this.handleError));
  }

  getCagesByFarmerId(farmerId: number){
    this.setToken();
    return this.http.get<Cage[]>(this.buildPath() + '/' + farmerId + '/cages', this.httpOptions).pipe(catchError(this.handleError));
  }

  getExpenses(farmerId: number): Observable<Expense[]> {
    this.setToken();
    const url = `${this.baseUrl}${this.extraUrl}/${farmerId}/expenses`;
    return this.http.get<Expense[]>(url, this.httpOptions).pipe(catchError(this.handleError));
  }

  getResources(farmerId: number): Observable<Resource[]> {
    this.setToken();
    const url = `${this.baseUrl}${this.extraUrl}/${farmerId}/resources`;
    return this.http.get<Resource[]>(url, this.httpOptions).pipe(catchError(this.handleError));
  }
}
