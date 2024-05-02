import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

//Import the notification model
import {Notification} from "../models/notification.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationApiService {

  baseUrl: string = environment.baseURL;

  extraUrl: string = '/notifications/';

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

  //Get all notifications-view-advisor
  getList(): Observable<Notification> {
    return this.http
      .get<Notification>(this.baseUrl + this.extraUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Get notification by index
  getResource(index:any){
    return this.http.get<Notification>(this.baseUrl + this.extraUrl + index)
  }

  deleteItem(id: any): Observable<Notification> {
    console.log(this.baseUrl + this.extraUrl + id)
    console.log(id)
    return this.http
      .delete<Notification>(this.baseUrl + this.extraUrl + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
