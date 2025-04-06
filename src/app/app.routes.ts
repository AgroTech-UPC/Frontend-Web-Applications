import { Routes } from '@angular/router';

import {NotificationsViewComponent} from "./appointment/pages/notifications-view/notifications-view.component";
import {ClientsViewComponent} from "./appointment/pages/clients-view/clients-view.component";
import {MyPublicationsComponent} from "./publication/pages/my-publications/my-publications.component";
import {NewPublicationComponent} from "./publication/pages/new-publication/new-publication.component";
import {PublicationDetailComponent} from "./publication/pages/publication-detail/publication-detail.component";
import {PublicationsViewComponent} from "./publication/pages/publications-view/publications-view.component";

import {ViewAdvisorsSearchComponent} from "./appointment/pages/view-advisors-search/view-advisors-search.component";
import {ViewMyAdvisorsComponent} from "./appointment/components/view-my-advisors/view-my-advisors.component";
import {ViewAdvisorAboutusComponent} from "./appointment/components/view-advisor-aboutus/view-advisor-aboutus.component";
import {ViewReserveAppointmentComponent} from "./appointment/components/view-reserve-appointment/view-reserve-appointment.component";
import {ReviewComponent} from "./appointment/components/review/review.component";
import {LoginComponent} from "./iam/pages/login/login.component";
import {ClientDetailComponent} from "./appointment/components/client-detail/client-detail.component";

import {SignupComponent} from "./iam/pages/signup/signup.component";
import {SignupFarmerComponent} from "./iam/pages/signup-farmer/signup-farmer.component";
import {SignupAdvisorComponent} from "./iam/pages/signup-advisor/signup-advisor.component";

import {ListAvailabilityScheduleComponent} from "./appointment/pages/list-availability-schedule/list-availability-schedule.component";
import {AddAvailabilityScheduleComponent} from "./appointment/components/add-availability-schedule/add-availability-schedule.component";

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: SignupComponent},
  {path: 'registro/granjero', component: SignupFarmerComponent},
  {path: 'registro/asesor', component: SignupAdvisorComponent},
  {path: 'granjero/asesores', component: ViewAdvisorsSearchComponent},
  {path: 'granjero/citas', component: ViewMyAdvisorsComponent},
  {path: 'granjero/asesor-info/:id', component: ViewAdvisorAboutusComponent},
  {path: 'granjero/asesor-info/:id/reservar-cita', component: ViewReserveAppointmentComponent},
  {path: 'granjero/mis-asesores/:id', component: ReviewComponent},
  {path: 'granjero/publicaciones', component: PublicationsViewComponent},
  {path: 'granjero/notificaciones', component: NotificationsViewComponent},
  {path: 'asesor/clientes', component: ClientsViewComponent },
  {path: 'asesor/clientes/:id', component: ClientDetailComponent},
  {path: 'asesor/mis-publicaciones', component: MyPublicationsComponent },
  {path: 'asesor/nueva-publicacion', component: NewPublicationComponent },
  {path: 'asesor/mis-publicaciones/:id', component: PublicationDetailComponent},
  {path: 'asesor/notificaciones', component: NotificationsViewComponent},
  {path: 'asesor/horarios', component: ListAvailabilityScheduleComponent},
  {path: 'asesor/horarios/agregar', component: AddAvailabilityScheduleComponent}
];
