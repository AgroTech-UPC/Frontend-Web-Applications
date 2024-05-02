import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {Publication} from "../../models/publication.model";
import {PublicationsApiService} from "../../services/publications-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-publications',
  standalone: true,
    imports: [
        MatButton,
        MatCard,
        MatCardContent,
        MatCardFooter,
        MatCardHeader,
        MatCardTitle,
        NgForOf
    ],
  templateUrl: './my-publications.component.html',
  styleUrl: './my-publications.component.css'
})
export class MyPublicationsComponent implements OnInit {
  publications: Publication[] = [];

  constructor(private publicationsService: PublicationsApiService, private router: Router) { }

  ngOnInit() {
    this.getPublications();
  }

  getPublications() {
    this.publicationsService.getPublications().subscribe((res) => {
      res.forEach((publication) => {
        let publicationData = new Publication();
        publicationData.id = publication.id;
        publicationData.title = publication.title;
        publicationData.description = publication.description;
        publicationData.date = publication.date;
        publicationData.image = publication.image;
        publicationData.is_active = publication.is_active;
        this.publications.push(publicationData);
      });
    });
  }

  getPublication(id: any) {
    this.router.navigateByUrl(`asesor/mis-publicaciones/${id}`);
  }

  goToCreatePublication() {
    this.router.navigateByUrl('asesor/nueva-publicacion');
  }

}
