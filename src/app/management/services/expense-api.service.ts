import { Injectable } from '@angular/core';

import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

//Import the expense model
import {Expense} from "../models/expense.model";
@Injectable({
  providedIn: 'root'
})
export class ExpenseApiService {

  baseUrl: string = environment.baseURL;

  extraUrl: string = '/expenses/';

  constructor(private http:HttpClient) { }

  //Options for HTTP requests
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side errors or network issues.
      console.log(
        `An error occurred ${error.status}, body was: ${error.error}`
      );
    } else {
      // Errors returned by the backend.
      console.log(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Return an Observable that emits an error message.
    return throwError(
      'Something happened with request, please try again later.'
    );
  }

  //Get all expenses
  getList(): Observable<Expense> {
    return this.http
      .get<Expense>(this.baseUrl + this.extraUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Get expense by index
  getExpense(index:any){
    return this.http.get<Expense>(this.baseUrl + this.extraUrl + index)
  }
}
