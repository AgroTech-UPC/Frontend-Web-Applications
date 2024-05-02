import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdvisorHistory } from '../../models/advisor_history';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HistoryAdviserApiService {
  baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient) { }

  getAdvisorHistory(advisorId: number): Observable<AdvisorHistory[]> {
    return this.http.get<AdvisorHistory[]>(`${this.baseUrl}/advisor/${advisorId}/history`);
  }
}
