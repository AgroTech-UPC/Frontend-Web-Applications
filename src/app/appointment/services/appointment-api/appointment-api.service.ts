import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

import {Appointment} from "../../models/appointment.model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppointmentApiService {
  baseUrl: string = environment.baseURL;
  constructor(private http: HttpClient) { }

  getAppointments(){
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments`);
  }
  getAppointment(id: any){
    return this.http.get<Appointment>(`${this.baseUrl}/appointments/${id}`);
  }

  getHighestId(): Observable<number>{
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments`).pipe(
      map(appointments => {
        let highestId = 0;
        for (let appointment of appointments) {
          let appointmentId = Number(appointment.id);
          if (appointmentId > highestId) {
            highestId = appointmentId;
          }
        }
        return highestId;
      })
    );
  }

  addAppointment(appointment: Appointment){
    return this.http.post<Appointment>(`${this.baseUrl}/appointments`, appointment);
  }
}
