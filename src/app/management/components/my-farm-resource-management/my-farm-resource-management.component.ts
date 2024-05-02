import { Component, OnInit } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButton } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

// library lodash to clone objects
import * as _ from 'lodash';
import cloneDeep from 'lodash/cloneDeep';

import { FormsModule } from "@angular/forms";
import { ResourceBreederApiService } from "../../services/resource-breeder-api.service";
import {EmptyViewComponent} from "../../../public/components/empty-view/empty-view.component";
import {HeaderComponent} from "../../../public/components/header/header.component";
import {SidenavComponent} from "../../../public/components/sidenav/sidenav.component";
import {MatIcon} from "@angular/material/icon";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-farm-resource-management',
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
    MatIcon
  ],
  templateUrl: './my-farm-resource-management.component.html',
  styleUrl: './my-farm-resource-management.component.css'
})
export class MyFarmResourceManagementComponent implements OnInit {

  resources: any[] = [];
  filteredResources: any[] = [];

  selectedResourceType: string;
  resourceTypes: { [key: string]: string } = {
    '1': 'Todos',
    '2': 'Alimento',
    '3': 'Medicina',
    '4': 'Cultivo'
  };

  constructor(private resourceBreederApiService: ResourceBreederApiService, private router: Router) {
    this.selectedResourceType = '1';
  }

  ngOnInit(): void {
    this.loadResources();
    this.filteredResources = cloneDeep(this.resources);
  }

  filterResource(): void {
    const selectedType = this.selectedResourceType;
    if (selectedType === '1') {
      // Si el tipo seleccionado es 'Todos', mostrar todos los recursos
      this.filteredResources = [...this.resources];
    } else {
      // De lo contrario, filtra los recursos por el tipo seleccionado
      this.filteredResources = this.resources.filter(resource => resource.type === this.resourceTypes[selectedType]);
    }
  }

  private loadResources() {
    this.resourceBreederApiService.getList().subscribe((response: any) => {
      console.log(response);

      response.forEach((resourceData: any) => {
        // Verify if the breeder id is 1
        if (resourceData.breeders[0].id === 1) {
          // Create a new date object
          const date = new Date(resourceData.date);
          // Apply the format to the date
          const formattedDate = date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

          this.resources.push({
            name: resourceData.resources[0].name,
            type: resourceData.resources[0].type,
            date: formattedDate
          });
        }
      });
    }, (error) => {
      console.error(error);
    });
  }

  redirectToMyFarmView() {
    // Redirect to MyFarm view
    this.router.navigate(['myFarm']);
  }
}
