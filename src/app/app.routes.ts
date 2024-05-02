import { Routes } from '@angular/router';
import { RegisterComponent} from "./register/register.component";
import { RegisterCageComponent } from "./register/register-cage/components/register-cage/register-cage.component";
import { RegisterExpensesComponent } from "./register/register-expenses/components/register-expenses.component";
import { RegisterCuyComponent } from "./register/register-cuy/components/register-cuy.component";
import { RegisterResourcesComponent} from "./register/register-resources/components/register-resources.component";

export const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/register-cage', component: RegisterCageComponent },
  { path: 'register/register-expenses', component: RegisterExpensesComponent },
  { path: 'register/register-cuy', component: RegisterCuyComponent },
  { path: 'register/register-resources', component: RegisterResourcesComponent }
];
