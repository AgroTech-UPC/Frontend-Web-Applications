import { Component } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatButton} from "@angular/material/button";
import {filter} from "rxjs";
import {MatCard, MatCardActions, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
@Component({
  selector: 'app-my-farm-resource-management',
  standalone: true,
  imports: [
    MatRadioModule,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle
  ],
  templateUrl: './my-farm-resource-management.component.html',
  styleUrl: './my-farm-resource-management.component.css'
})
export class MyFarmResourceManagementComponent {

  filterResource() {

  }
}
