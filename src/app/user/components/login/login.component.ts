import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {UserApiService} from "../../services/user-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private userApiService: UserApiService, private router: Router) {}

  loginAsBreeder() {
    this.userApiService.setIsBreeder(true);
    this.router.navigateByUrl('/criador/mi-granja');
  }

  loginAsAdvisor() {
    this.userApiService.setIsBreeder(false);
    this.router.navigateByUrl('/asesor/clientes');
  }

}
