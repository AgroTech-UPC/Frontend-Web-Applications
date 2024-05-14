import { Component, OnInit } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButton } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

// library lodash to clone objects
import * as _ from 'lodash';
import cloneDeep from 'lodash/cloneDeep';

import { FormsModule } from "@angular/forms";
import { EmptyViewComponent } from "../../../public/components/empty-view/empty-view.component";
import { HeaderComponent } from "../../../public/components/header/header.component";
import { SidenavComponent } from "../../../public/components/sidenav/sidenav.component";

// Import the ResourceBreederApiService
import { ExpenseApiService } from "../../services/expense-api.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-my-farm-expenses-management',
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
  templateUrl: './my-farm-expenses-management.component.html',
  styleUrls: ['./my-farm-expenses-management.component.css']
})
export class MyFarmExpensesManagementComponent implements OnInit {

  expenses: any[] = [];
  filteredExpenses: any[] = [];

  selectedResourceType: string;
  resourceTypes: { [key: string]: string } = {
    '1': 'Todos',
    '2': 'Salud',
    '3': 'Alimento',
    '4': 'Mantenimiento de criadero'
  };

  constructor(private expenseApiService: ExpenseApiService, private router: Router) {
    this.selectedResourceType = '1';
  }

  ngOnInit(): void {
    this.loadExpenses();
    this.filteredExpenses = cloneDeep(this.expenses);
  }

  filterResource(): void {
    const selectedType = this.selectedResourceType;
    if (selectedType === '1') {
      // Si el tipo seleccionado es 'Todos', mostrar todos los recursos
      this.filteredExpenses = [...this.expenses];
    } else {
      // De lo contrario, filtra los recursos por el tipo seleccionado
      this.filteredExpenses = this.expenses.filter(resource => resource.type === this.resourceTypes[selectedType]);
    }
  }

  private loadExpenses() {
    this.expenseApiService.getAll().subscribe((resources: any) => {
      this.expenses = resources;
      this.filteredExpenses = cloneDeep(this.expenses);
    });
  }

  goBack() {
    window.history.back();
  }

}
