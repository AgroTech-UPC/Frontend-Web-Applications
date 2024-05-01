import { Routes } from '@angular/router';
import { RegisterComponent} from "./register/register.component";
import { RegisterCageComponent } from "./register/register-cage/register-cage.component";
import { RegisterExpensesComponent } from "./register/register-expenses/register-expenses.component";
import { RegisterCuyComponent } from "./register/register-cuy/register-cuy.component";
import { RegisterResourcesComponent} from "./register/register-resources/register-resources.component";

export const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'register-cage', component: RegisterCageComponent },
  { path: 'register-expenses', component: RegisterExpensesComponent },
  { path: 'register-cuy', component: RegisterCuyComponent },
  { path: 'register-resources', component: RegisterResourcesComponent }
];
