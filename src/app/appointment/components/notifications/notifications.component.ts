import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {Notification} from "../../models/notification.model";
import {NotificationApiService} from "../../services/notification-api.service";
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
  results: any[] = [];

  constructor(private notificationsApiService: NotificationApiService, private router: Router) { }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {
    this.notificationsApiService.getList().subscribe((response: any) => {
      console.log(response);

      response.forEach((resourceData: any) => {
        // Verify if the breeder id is 1
        if (resourceData.users[0].id === 3) {
          // Create a new date object
          const date = new Date(resourceData.date);
          // Apply the format to the date
          const formattedDate = date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });

          this.results.push({
            id: resourceData.id,
            type: resourceData.type,
            text: resourceData.text,
            date: formattedDate
          });
        }
      });
    }, (error) => {
      console.error(error);
    });
  }

}
