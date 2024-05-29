import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {Publication} from "../../models/publication.model";
import {PublicationsApiService} from "../../services/publications-api.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PublicationCardComponent} from "../../components/publication-card/publication-card.component";
import {AdvisorApiService} from "../../../user/services/advisor-api.service";
import {EmptyViewComponent} from "../../../public/components/empty-view/empty-view.component";

@Component({
  selector: 'app-my-publications',
  standalone: true,
  imports: [
    MatButton,
    NgForOf,
    PublicationCardComponent,
    EmptyViewComponent,
    NgIf
  ],
  templateUrl: './my-publications.component.html',
  styleUrl: './my-publications.component.css'
})
export class MyPublicationsComponent implements OnInit {
  advisor_id = 0;
  publications: Publication[] = [];

  constructor(private publicationsService: PublicationsApiService,
              private advisorService: AdvisorApiService,
              private router: Router) { }

  ngOnInit() {
    this.advisor_id = this.advisorService.getAdvisorId();
    this.getPublications();
  }

  getPublications() {
    this.publicationsService.getAll().subscribe((res) => {
      this.publications = res.filter((publication) => publication.advisor_id === this.advisor_id);
    });
  }

  goToCreatePublication() {
    this.router.navigateByUrl('asesor/nueva-publicacion');
  }

}
