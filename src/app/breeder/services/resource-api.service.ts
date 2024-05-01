import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

//Import the resource model
import {Resource} from "../models/resource.model";
@Injectable({
  providedIn: 'root'
})
export class ResourceApiService {

  baseUrl: string = environment.baseURL;

  extraUrl: string = 'resources/';

  constructor(private http:HttpClient) { }

  //Options for HTTP requests
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Manejo de errores del lado del cliente o problemas de red.
      console.log(
        `An error occurred ${error.status}, body was: ${error.error}`
      );
    } else {
      // Manejo de errores devueltos por el backend.
      console.log(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Devuelve un Observable que emite un mensaje de error.
    return throwError(
      'Something happened with request, please try again later.'
    );
  }

  //Get all breeders
  getList(): Observable<Resource> {
    return this.http
      .get<Resource>(this.baseUrl + this.extraUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Get breeder by index
  getResource(index:any){
    return this.http.get<Resource>(this.baseUrl + this.extraUrl + index)
  }

}
