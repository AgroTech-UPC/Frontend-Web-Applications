import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Notification } from "../models/notification.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationsApiService {
  baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient) { }

  getNotifications() {
    return this.http.get<Notification[]>(`${this.baseUrl}/notifications`);
  }
}
