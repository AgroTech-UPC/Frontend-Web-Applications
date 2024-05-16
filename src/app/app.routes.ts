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
import {CageListComponent} from "./management/pages/cage-list/cage-list.component";
import {CageEditorComponent} from "./management/pages/cage-editor/cage-editor.component";
import {AnimalListComponent} from "./management/pages/animal-list/animal-list.component";
import {AnimalInformationComponent} from "./management/pages/animal-information/animal-information.component";
import {ClientsComponent} from "./appointment/components/clients/clients.component";
import {MyPublicationsComponent} from "./publication/pages/my-publications/my-publications.component";
import {NewPublicationComponent} from "./publication/pages/new-publication/new-publication.component";
import {NotificationsViewAdvisorComponent} from "./appointment/components/notifications-view-advisor/notifications-view-advisor.component";
import {PublicationDetailComponent} from "./publication/pages/publication-detail/publication-detail.component";
import {PublicationsViewComponent} from "./publication/pages/publications-view/publications-view.component";

import {ViewAdvisorsSearchComponent} from "./appointment/components/view-advisors-search/view-advisors-search.component";
import {ViewMyAdvisorsComponent} from "./appointment/components/view-my-advisors/view-my-advisors.component";
import {ViewAdvisorAboutusComponent} from "./appointment/components/view-advisor-aboutus/view-advisor-aboutus.component";
import {ViewReserveAppointmentComponent} from "./appointment/components/view-reserve-appointment/view-reserve-appointment.component";
import {ReviewComponent} from "./appointment/components/review/review.component";
import {LoginComponent} from "./user/pages/login/login.component";
import {ClientDetailComponent} from "./appointment/components/client-detail/client-detail.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: LoginComponent},
  {path: 'criador/mi-granja', component: MyFarmViewComponent},
  {path: 'criador/mi-granja/recursos', component: MyFarmResourceManagementComponent},
  {path: 'criador/mi-granja/gastos', component: MyFarmExpensesManagementComponent},
  {path: 'criador/buscar-asesor', component: ViewAdvisorsSearchComponent},
  {path: 'criador/mis-asesores', component: ViewMyAdvisorsComponent},
  {path: 'criador/asesor-info/:id', component: ViewAdvisorAboutusComponent},
  {path: 'criador/asesor-info/:id/reservar-cita', component: ViewReserveAppointmentComponent},
  {path: 'criador/mis-asesores/:id', component: ReviewComponent},
  {path: 'criador/mis-animales', component: CageListComponent},
  {path: 'criador/mis-animales/:id', component: AnimalListComponent},
  {path: 'criador/mis-animales/:cageid/informacion/:id', component: AnimalInformationComponent},
  {path: 'criador/mis-animales/editar/:id', component: CageEditorComponent},
  {path: 'criador/registro', component: RegisterComponent},
  {path: 'criador/registro/jaula', component: RegisterCageComponent},
  {path: 'criador/registro/gasto', component: RegisterExpensesComponent},
  {path: 'criador/registro/animal', component: RegisterCuyComponent},
  {path: 'criador/registro/recurso', component: RegisterResourcesComponent},
  {path: 'criador/publicaciones', component: PublicationsViewComponent},
  {path: 'notificaciones', component: NotificationsViewComponent},
  {path: 'asesor/clientes', component: ClientsComponent },
  {path: 'asesor/clientes/:id', component: ClientDetailComponent},
  {path: 'asesor/mis-publicaciones', component: MyPublicationsComponent },
  {path: 'asesor/nueva-publicacion', component: NewPublicationComponent },
  {path: 'asesor/mis-publicaciones/:id', component: PublicationDetailComponent},
  {path: 'asesor/notificaciones', component: NotificationsViewAdvisorComponent}

];
