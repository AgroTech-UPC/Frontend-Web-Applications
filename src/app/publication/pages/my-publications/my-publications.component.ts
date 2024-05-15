import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {Publication} from "../../models/publication.model";
import {PublicationsApiService} from "../../services/publications-api.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PublicationCardComponent} from "../../components/publication-card/publication-card.component";

@Component({
  selector: 'app-my-publications',
  standalone: true,
  imports: [
    MatButton,
    NgForOf,
    PublicationCardComponent
  ],
  templateUrl: './my-publications.component.html',
  styleUrl: './my-publications.component.css'
})
export class MyPublicationsComponent implements OnInit {
  publications: Publication[] = [];

  constructor(private publicationsService: PublicationsApiService,
              private router: Router) { }

  ngOnInit() {
    this.getPublications();
  }

  getPublications() {
    this.publicationsService.getAll().subscribe((res) => {
      res.forEach((publication) => {
        let publicationData = {} as Publication;
        publicationData.id = publication.id;
        publicationData.title = publication.title;
        publicationData.description = publication.description;
        publicationData.date = publication.date;
        publicationData.image = publication.image;
        this.publications.push(publicationData);
      });
    });
  }

  goToCreatePublication() {
    this.router.navigateByUrl('asesor/nueva-publicacion');
  }

}
