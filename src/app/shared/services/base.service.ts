import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  baseUrl: string = environment.baseURL;
  extraUrl: string = '';

  httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' }
    ),
  };
  constructor(private http: HttpClient) {}

  private buildPath() {
    return this.baseUrl + this.extraUrl;
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }

  getAll() {
    return this.http.get<T[]>(this.buildPath()).pipe(catchError(this.handleError));
  }

  getOne(id: any) {
    return this.http.get<T>(this.buildPath() + id).pipe(catchError(this.handleError));
  }

  create(item: T) {
    return this.http.post<T>(this.buildPath(), item, this.httpOptions).pipe(catchError(this.handleError));
  }

  update(id: any, item: T) {
    return this.http.put<T>(this.buildPath() + id, item, this.httpOptions).pipe(catchError(this.handleError));
  }

  delete(id: any) {
    console.log(this.buildPath()  + id)
    console.log(id)
    return this.http.delete<T>(this.buildPath() + id, this.httpOptions).pipe(catchError(this.handleError));
  }
}
