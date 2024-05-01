import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { Expense } from '../models/expense.model';
import { ExpenseService } from '../services/expense-service.service';
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
  id: string = '';
  amount: string = '';
  kind: string = '';
  details: string = '';
  cuy_id: string = '';
  date: string = '';
  expense: Expense = {
    id: '',
    amount: '',
    kind: '',
    details: '',
    cuy_id: '',
    date: ''
  };

  constructor(public dialog: MatDialog, private expenseService: ExpenseService, private snackBar: MatSnackBar, private router: Router) {}

  openDialog(): void {
    this.dialog.open(DialogComponent);
  }

  handleClick(): void {
    if (!this.amount || !this.kind || !this.cuy_id || !this.date) {
      this.openDialog();
    } else {
      this.registerExpense();
      this.snackBar.open('Registrado con éxito', 'Cerrar', {
        duration: 3000,
      }).afterDismissed().subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  registerExpense(): void {
    this.expenseService.getHighestId().subscribe(highestId => {
      this.expense = {
        id: (highestId + 1).toString(),
        amount: this.amount,
        kind: this.kind,
        details: this.details,
        cuy_id: this.cuy_id,
        date: this.date
      };
      this.expenseService.addExpense(this.expense).subscribe();
    });
  }
}
