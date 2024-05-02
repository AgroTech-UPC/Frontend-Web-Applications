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
import {CageListComponent} from "./management/components/cage-list/cage-list.component";
import {CageEditorComponent} from "./management/components/cage-editor/cage-editor.component";
import {AnimalListComponent} from "./management/components/animal-list/animal-list.component";
import {AnimalInformationComponent} from "./management/components/animal-information/animal-information.component";
import {ClientsComponent} from "./appointment/components/clients/clients.component";
import {MyPublicationsComponent} from "./publication/components/my-publications/my-publications.component";
import {NewPublicationComponent} from "./publication/components/new-publication/new-publication.component";
import {NotificationsViewAdvisorComponent} from "./appointment/components/notifications-view-advisor/notifications-view-advisor.component";
import {PublicationDetailComponent} from "./publication/components/publication-detail/publication-detail.component";


export const routes: Routes = [
  {path: '', redirectTo: 'criador/mi-granja', pathMatch: 'full'},
  {path: 'criador/mi-granja', component: MyFarmViewComponent},
  {path: 'criador/mi-granja/recursos', component: MyFarmResourceManagementComponent},
  {path: 'criador/mi-granja/gastos', component: MyFarmExpensesManagementComponent},
  //{path: 'criador/asesores', component: RegisterComponent},
  {path: 'criador/mis-animales', component: CageListComponent},
  {path: 'criador/mis-animales/:id', component: AnimalListComponent},
  {path: 'criador/mis-animales/:cageid/informacion/:id', component: AnimalInformationComponent},
  {path: 'criador/mis-animales/editar/:id', component: CageEditorComponent},
  {path: 'criador/registro', component: RegisterComponent},
  {path: 'criador/registro/jaula', component: RegisterCageComponent},
  {path: 'criador/registro/gasto', component: RegisterExpensesComponent},
  {path: 'criador/registro/animal', component: RegisterCuyComponent},
  {path: 'criador/registro/recurso', component: RegisterResourcesComponent},
  {path: 'notificaciones', component: NotificationsViewComponent},
  {path: 'asesor/clientes', component: ClientsComponent },
  {path: 'asesor/mis-publicaciones', component: MyPublicationsComponent },
  {path: 'asesor/nueva-publicacion', component: NewPublicationComponent },
  {path: 'asesor/mis-publicaciones/:id', component: PublicationDetailComponent},
  {path: 'asesor/notificaciones', component: NotificationsViewAdvisorComponent}

];
