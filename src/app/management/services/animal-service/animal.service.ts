import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Animal} from "../../models/animal.model";
import {map} from "rxjs/operators";
import {Expense} from "../../models/expense.model";
import {Cage} from "../../models/cage.model";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  baseURL = environment.baseURL;
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('An error occurred:', error.error.message);
    }
    else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  addCage(item: any): Observable<any>{
    return this.http
      .post<any>(`${this.baseURL}/cages`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getCages(){
    return this.http
      .get<any>(`${this.baseURL}/cages`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getCage(id: number){
    return this.http
      .get<any>(`${this.baseURL}/cages/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateCage(item: any): Observable<any>{
    return this.http
      .put<any>(`${this.baseURL}/cages/${item.id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteCage(id: number){
    return this.http
      .delete<any>(`${this.baseURL}/cages/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAnimals(id: number){
    return this.http
      .get<any>(`${this.baseURL}/animals?cage_id=${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAnimal(id: number){
    return this.http
      .get<any>(`${this.baseURL}/animals/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateAnimal(item: any): Observable<any>{
    return this.http
      .put<any>(`${this.baseURL}/animals/${item.id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteAnimal(id: number){
    return this.http
      .delete<any>(`${this.baseURL}/animals/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getHighestAnimalId(): Observable<number> {
    return this.http.get<Animal[]>(`${this.baseURL}/animals`).pipe(
      map(animals => Math.max(...animals.map((animal) => Number(animal.id)))),
      catchError((err, caught) => this.handleError(err))
    );
  }
  getHighestCageId(): Observable<number> {
    return this.http.get<Cage[]>(`${this.baseURL}/cages`).pipe(
      map(cages => Math.max(...cages.map((cage) => Number(cage.id)))),
      catchError((err, caught) => this.handleError(err))
    );
  }

  addAnimal(item: any): Observable<any>{
    return this.http
      .post<any>(`${this.baseURL}/animals`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
