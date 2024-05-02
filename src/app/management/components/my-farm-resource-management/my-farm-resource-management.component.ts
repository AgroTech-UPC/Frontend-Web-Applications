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
//import { ResourceBreederApiService } from "../../services/resource-breeder-api.service";
import {EmptyViewComponent} from "../../../public/components/empty-view/empty-view.component";
import {HeaderComponent} from "../../../public/components/header/header.component";
import {SidenavComponent} from "../../../public/components/sidenav/sidenav.component";
import {MatIcon} from "@angular/material/icon";
import {Router} from "@angular/router";
import {ResourceApiService} from "../../services/resource-api.service";

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

  constructor(private resourceApiService: ResourceApiService, private router: Router) {
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
    this.resourceApiService.getList().subscribe((resources: any) => {
      this.resources = resources;
      this.filteredResources = cloneDeep(this.resources);
    });
  }


  goBack() {
    window.history.back();
  }
}
