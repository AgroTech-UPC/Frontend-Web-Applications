import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'animales', component: CageListComponent },
  { path: 'animales/:id', component: AnimalListComponent },
  { path: 'animales/edit/:id', component: CageEditorComponent },
  { path: 'animales/:cageid/informacion/:id', component: AnimalInformationComponent },
];
