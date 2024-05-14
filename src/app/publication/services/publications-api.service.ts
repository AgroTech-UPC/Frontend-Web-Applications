import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Publication } from "../models/publication.model";

import {BaseService} from "../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
<<<<<<< HEAD
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
=======
export class PublicationsApiService extends BaseService<Publication>{
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.publicationURL;
>>>>>>> feature/publication-view
  }
}
