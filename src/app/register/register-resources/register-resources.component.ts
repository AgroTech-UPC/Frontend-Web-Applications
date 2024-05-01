import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-register-resources',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatFormField,
    MatInput
  ],
  templateUrl: './register-resources.component.html',
  styleUrl: './register-resources.component.css'
})
export class RegisterResourcesComponent {

}
