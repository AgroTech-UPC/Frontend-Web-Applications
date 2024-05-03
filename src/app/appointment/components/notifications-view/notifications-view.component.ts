import {Component, OnInit} from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButton } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import {HeaderComponent} from "../../../public/components/header/header.component";
import {EmptyViewComponent} from "../../../public/components/empty-view/empty-view.component";
import {FormsModule} from "@angular/forms";
import {SidenavComponent} from "../../../public/components/sidenav/sidenav.component";


//Import the NotificationApiService

import { Router } from "@angular/router";
import {NotificationApiService} from "../../services/notificaction-api/notification-api.service";

@Component({
  selector: 'app-notifications-view-advisor-view',
  standalone: true,
  imports: [
    MatRadioModule,
    MatButton,
    MatCardModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    EmptyViewComponent,
    HeaderComponent,
    SidenavComponent,
    MatIconModule
  ],
  templateUrl: './notifications-view.component.html',
  styleUrl: './notifications-view.component.css'
})
export class NotificationsViewComponent implements OnInit{
  results: any[] = [];

  constructor(private notificationsApiService: NotificationApiService, private router: Router) {

  }

  ngOnInit(): void {
    this.loadNotifications();
  }



  private loadNotifications() {
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

  deleteNotification(id: string) {
    this.notificationsApiService.deleteItem(id).subscribe(() => {
      console.log("Notificación eliminada con éxito.");
      this.results = this.results.filter((notification: any) => notification.id !== id);
    }, (error) => {
      console.error("Error al eliminar la notificación:", error);
    });
  }
}
