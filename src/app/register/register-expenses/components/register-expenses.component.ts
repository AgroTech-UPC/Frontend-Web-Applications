import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-register-expenses',
  standalone: true,
    imports: [
        MatButton,
        RouterLink
    ],
  templateUrl: './register-expenses.component.html',
  styleUrl: './register-expenses.component.css'
})
export class RegisterExpensesComponent {

}
