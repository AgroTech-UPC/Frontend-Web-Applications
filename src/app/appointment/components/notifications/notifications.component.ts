import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {Notification} from "../../models/notification.model";
import {NotificationsApiService} from "../../services/notifications-api.service";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    MatButton,
    MatCardModule,
    NgForOf,
    DatePipe
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationsService: NotificationsApiService, private router: Router) { }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {
    this.notificationsService.getNotifications().subscribe((res) => {
      res.forEach((notification) => {
        let notificationData = new Notification();
        notificationData.id = notification.id;
        notificationData.type = notification.type;
        notificationData.text = notification.text;
        notificationData.date = notification.date;
        this.notifications.push(notificationData);
      });
    });
  }

}
