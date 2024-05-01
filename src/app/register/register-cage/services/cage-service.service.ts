import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cage } from '../model/cage.model';

@Injectable({
  providedIn: 'root'
})
export class CageService {
  private apiUrl = 'http://localhost:3000/cages';  // Asegúrate de que este puerto coincide con el que estás utilizando para json-server

  constructor(private http: HttpClient) { }

  addCage(cage: Cage): Observable<Cage> {
    return this.http.post<Cage>(this.apiUrl, cage);
  }
}
