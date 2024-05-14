import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../public/components/dialog/dialog.component';
import { Expense } from '../../models/expense.model';
import { ExpenseApiService } from "../../services/expense-api.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";

@Component({
  selector: 'app-register-expenses',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    MatRadioButton,
    MatRadioGroup
  ],
  templateUrl: './register-expenses.component.html',
  styleUrl: './register-expenses.component.css'
})
export class RegisterExpensesComponent {
  expense: Expense = {
    id: 0,
    breeder_id: 1, // hardcoded for now
    type: "",
    amount: 0,
    date: new Date(),
    details: ""
  };

  constructor(public dialog: MatDialog, private expenseService: ExpenseApiService, private snackBar: MatSnackBar, private router: Router) {}

  openDialog(): void {
    this.dialog.open(DialogComponent);
  }

  handleClick(): void {
    if (!this.expense.amount || !this.expense.type || !this.expense.date) {
      this.openDialog();
    } else {
      this.registerExpense();
      this.snackBar.open('Registrado con éxito', 'Cerrar', {
        duration: 3000,
      }).afterDismissed().subscribe(() => {
        this.router.navigate(['/criador/registro']);
      });
    }
  }

  registerExpense(): void {
    this.expenseService.create(this.expense).subscribe();
  }

  goBack() {
    window.history.back();
  }
}
