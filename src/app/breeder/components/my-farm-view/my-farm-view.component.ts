import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-my-farm-view',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './my-farm-view.component.html',
  styleUrl: './my-farm-view.component.css'
})
export class MyFarmViewComponent {

}
