import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Client } from "../../models/client.model";

@Injectable({
  providedIn: 'root'
})
export class ClientsApiService {
  baseUrl: string = environment.baseURL2;

  constructor(private http: HttpClient) { }

  getAppointments() {
    return this.http.get<Client[]>(`${this.baseUrl}/appointments`);
  }

  getAppointment(id: any) {
    return this.http.get<Client>(`${this.baseUrl}/appointments/${id}`);
  }
}
