import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Expense } from '../../models/expense.model';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expensesUrl = `${environment.baseURL2}/expenses`;  // URL to web api

  constructor(private http: HttpClient) { }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.expensesUrl, expense);
  }

  getHighestId(): Observable<number> {
    return this.http.get<Expense[]>(this.expensesUrl).pipe(
      map(expenses => Math.max(...expenses.map(expense => Number(expense.id)))),
      catchError(this.handleError<number>('getHighestId', 0))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
