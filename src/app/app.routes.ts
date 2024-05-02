import { Routes } from '@angular/router';

import { RegisterComponent} from "./management/components/register/register.component";
import { RegisterCageComponent } from "./management/components/register-cage/register-cage.component";
import { RegisterExpensesComponent } from "./management/components/register-expenses/register-expenses.component";
import { RegisterCuyComponent } from "./management/components/register-cuy/register-cuy.component";
import { RegisterResourcesComponent} from "./management/components/register-resources/register-resources.component";


import {MyFarmViewComponent} from "./management/components/my-farm-view/my-farm-view.component";
import {MyFarmResourceManagementComponent} from "./management/components/my-farm-resource-management/my-farm-resource-management.component"
import {MyFarmExpensesManagementComponent} from "./management/components/my-farm-expenses-management/my-farm-expenses-management.component";

import {NotificationsViewComponent} from "./appointment/components/notifications-view/notifications-view.component";


export const routes: Routes = [
  {path: '', redirectTo: 'myFarm', pathMatch: 'full'},

  {path: 'myFarm', redirectTo: 'myFarm'},
  {path: 'myFarm', component: MyFarmViewComponent},

  {path: 'myFarm/resource', redirectTo: 'myFarm/resource'},
  {path: 'myFarm/resource', component: MyFarmResourceManagementComponent},

  {path: 'myFarm/expenses', redirectTo: 'myFarm/expenses'},
  {path: 'myFarm/expenses', component: MyFarmExpensesManagementComponent},

  {path: 'notifcations', redirectTo: 'notifcations'},
  {path: 'notifcations', component: NotificationsViewComponent}
];
