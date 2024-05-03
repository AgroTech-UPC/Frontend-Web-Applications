import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { Resource } from '../../models/resource.model';
import {Expense} from "../../models/expense.model";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private resourceUrl = 'http://localhost:3000/resources';  // Asegúrate de que este puerto coincide con el que estás utilizando para json-server

  constructor(private http: HttpClient) { }

  addResource(resource: Resource): Observable<Resource> {
    return this.http.post<Resource>(this.resourceUrl, resource);
  }

  getHighestId(): Observable<number> {
    return this.http.get<Resource[]>(this.resourceUrl).pipe(
      map(resources => Math.max(...resources.map(resource => Number(resource.id)))),
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
