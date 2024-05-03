import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Publication } from "../models/publication.model";
import {catchError, Observable, retry, throwError} from 'rxjs';
import {Notification} from "../../appointment/models/notification.model";

@Injectable({
  providedIn: 'root'
})
export class PublicationsApiService {
  baseUrl: string = environment.baseURL2;

  extraUrl: string = '/publications/';

  constructor(private http: HttpClient) { }

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

  getPublications() {
    return this.http.get<Publication[]>(this.baseUrl + this.extraUrl);
  }

  getPublication(id: any) {
    return this.http.get<Publication>(this.baseUrl + this.extraUrl + id);
  }

  createPublication(publication: Publication) : Observable<Publication> {
    const url = this.baseUrl + this.extraUrl;
    return this.http.post<Publication>(url, publication);
  }

  deletePublication(id: any): Observable<Publication> {
    console.log(this.baseUrl + this.extraUrl + id)
    console.log(id)
    return this.http
      .delete<Publication>(this.baseUrl + this.extraUrl + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
