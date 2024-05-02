import { Routes } from '@angular/router';

import {MyFarmViewComponent} from "./breeder/components/my-farm-view/my-farm-view.component";
import {MyFarmResourceManagementComponent} from "./breeder/components/my-farm-resource-management/my-farm-resource-management.component"
import {MyFarmExpensesManagementComponent} from "./breeder/components/my-farm-expenses-management/my-farm-expenses-management.component";

export const routes: Routes = [
  {path: '', redirectTo: 'myFarm', pathMatch: 'full'},
  {path: 'myFarm', component: MyFarmViewComponent},

  {path: 'myFarm/resource', redirectTo: 'myFarm/resource'},
  {path: 'myFarm/resource', component: MyFarmResourceManagementComponent},

  {path: 'myFarm/expenses', redirectTo: 'myFarm/expenses'},
  {path: 'myFarm/expenses', component: MyFarmExpensesManagementComponent}
];
