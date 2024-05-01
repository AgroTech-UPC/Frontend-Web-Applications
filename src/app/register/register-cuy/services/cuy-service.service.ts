import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cuy } from '../models/cuy.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuyServiceService {
  private apiUrl = 'http://localhost:3000/cuyes'; // replace with your API endpoint

  constructor(private http: HttpClient) { }

  addCuy(cuy: Cuy): Observable<Cuy> {
    return this.http.post<Cuy>(this.apiUrl, cuy);
  }
}
