import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

//Import the breeder model
import {Breeder} from "../models/breeder.model";
import {BaseService} from "../../shared/services/base.service";
import {catchError, Observable} from "rxjs";
import {Expense} from "../../management/models/expense.model";
import {Resource} from "../../management/models/resource.model";

@Injectable({
  providedIn: 'root'
})
export class BreederApiService extends  BaseService<Breeder>{
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.breederURL;
  }

  setBreederId(breeder_id: number) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('breeder_id', breeder_id.toString());
    }
  }

  getBreederId(): number {
    if (typeof window !== 'undefined' && window.localStorage) {
      const breeder_id = localStorage.getItem('breeder_id');
      return breeder_id ? parseInt(breeder_id) : 0;
    }
    return 0;
  }

  getExpenses(breederId: number): Observable<Expense[]> {
    const url = `${this.baseUrl}${this.extraUrl}/${breederId}/expenses`;
    return this.http.get<Expense[]>(url).pipe(catchError(this.handleError));
  }

  getResources(breederId: number): Observable<Resource[]> {
    const url = `${this.baseUrl}${this.extraUrl}/${breederId}/resources`;
    return this.http.get<Resource[]>(url).pipe(catchError(this.handleError));
  }
}
