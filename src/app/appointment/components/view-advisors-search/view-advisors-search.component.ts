import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {NgForOf} from "@angular/common";

import {Advisor} from "../../models/advisor.model";
import {AdvisorApiService} from "../../services/advisor-api/advisor-api.service";


@Component({
  selector: 'app-view-advisors-search',
  standalone: true,
  imports: [
    MatCardModule, MatToolbarModule, MatFormFieldModule,
    MatButtonModule, MatInputModule, NgForOf
  ],
  templateUrl: './view-advisors-search.component.html',
  styleUrl: './view-advisors-search.component.css'
})
export class ViewAdvisorsSearchComponent {
  advisors: Advisor[] = [];
  constructor(
    private advisorApiService: AdvisorApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAdvisors();
  }

  filter(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const filteredValue = inputElement.value.replace(/[^a-zA-Z ]/g, '');

    if (filteredValue === '') {
      this.getAdvisors();
    } else {
      this.advisorApiService.getAdvisors().subscribe(res => {
          this.advisors = res.filter(advisor =>
            advisor.users[0].fullname.toLowerCase().startsWith(filteredValue.toLowerCase())
          );
        },
        error => {
          console.log(error);
        });
    }
  }

  getAdvisors(){
    this.advisorApiService.getAdvisors().subscribe(res => {
        this.advisors = res;
        },
      error => {
        console.log(error);
      });
  }

  // BOTONES REDIRECCIONAR:
  navigateToAdvisorsSearch() {
    const id_criador = this.route.snapshot.paramMap.get('id_criador');
    this.router.navigate([`criador/${id_criador}/buscar-asesor`]);
  }
  navigateToMyAdvisors() {
    const id_criador = this.route.snapshot.paramMap.get('id_criador');
    this.router.navigate([`criador/${id_criador}/mis-asesores`]);
  }
  navigateToAdvisorInfo(id_asesor: number) {
    const id_criador = this.route.snapshot.paramMap.get('id_criador');
    this.router.navigate([`criador/${id_criador}/asesor-info/${id_asesor}`]);
  }
}
