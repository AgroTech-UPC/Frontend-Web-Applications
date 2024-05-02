import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

//Import the resource model
import {ResourceBreeder} from "../models/resource-breeder.model";

@Injectable({
  providedIn: 'root'
})
export class ResourceBreederApiService {

  baseUrl: string = environment.baseURL;

  extraUrl: string = 'resource_breeder/';

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
  getList(): Observable<ResourceBreeder> {
    return this.http
      .get<ResourceBreeder>(this.baseUrl + this.extraUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Get resource by index
  getResourceBreeder(index:any){
    return this.http.get<ResourceBreeder>(this.baseUrl + this.extraUrl + index)
  }

}
