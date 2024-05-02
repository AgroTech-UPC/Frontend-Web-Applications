import { Routes } from '@angular/router';
import { RegisterComponent} from "./management/components/register/register.component";
import { RegisterCageComponent } from "./management/components/register-cage/register-cage.component";
import { RegisterExpensesComponent } from "./management/components/register-expenses/register-expenses.component";
import { RegisterCuyComponent } from "./management/components/register-cuy/register-cuy.component";
import { RegisterResourcesComponent} from "./management/components/register-resources/register-resources.component";

export const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/register-cage', component: RegisterCageComponent },
  { path: 'register/register-expenses', component: RegisterExpensesComponent },
  { path: 'register/register-cuy', component: RegisterCuyComponent },
  { path: 'register/register-resources', component: RegisterResourcesComponent }
];
