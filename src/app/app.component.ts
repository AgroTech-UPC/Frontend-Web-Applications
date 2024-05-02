import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MyFarmViewComponent} from "./management/components/my-farm-view/my-farm-view.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MyFarmViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend-Web-Applications';
}
