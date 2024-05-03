import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {Notification} from "../../models/notification.model";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {EmptyViewComponent} from "../../../public/components/empty-view/empty-view.component";
import {NotificationApiService} from "../../services/notificaction-api/notification-api.service";


@Component({
  selector: 'app-notifications-view-advisor',
  standalone: true,
  imports: [
    MatButton,
    MatCardModule,
    NgForOf,
    DatePipe,
    EmptyViewComponent,
    NgIf
  ],
  templateUrl: './notifications-view-advisor.component.html',
  styleUrl: './notifications-view-advisor.component.css'
})
export class NotificationsViewAdvisorComponent implements OnInit {
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
        if (resourceData.users[0].id === 1) {
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

  deleteNotification(id: string) {
    this.notificationsApiService.deleteItem(id).subscribe(() => {
      console.log("Notificación eliminada con éxito.");
      this.results = this.results.filter((notification: any) => notification.id !== id);
    }, (error) => {
      console.error("Error al eliminar la notificación:", error);
    });
  }

}
