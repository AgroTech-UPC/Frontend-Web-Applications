import { Component, OnInit } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

import {Advisor} from "../../models/advisor.model";
import {AdvisorApiService} from "../../services/advisor-api/advisor-api.service";

import {Breeder} from "../../models/breeder.model";
import {BreederApiService} from "../../../user/services/breeder-api.service";
import {ActivatedRoute, Router} from "@angular/router";

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-view-my-advisors',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './view-my-advisors.component.html',
  styleUrl: './view-my-advisors.component.css'
})
export class ViewMyAdvisorsComponent {
  advisors: Advisor[] = [];
  constructor(
    private advisorApiService: AdvisorApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //this.getMyAdvisors();
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
}
