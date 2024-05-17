import { Component, OnInit } from '@angular/core';
import {NgForOf} from "@angular/common";
import {Publication} from "../../models/publication.model";
import {PublicationsApiService} from "../../services/publications-api.service";
import {Router} from "@angular/router";

import {PublicationReadonlyCardComponent} from "../../components/publication-readonly-card/publication-readonly-card.component";

@Component({
  selector: 'app-publications-view',
  standalone: true,
  imports: [
    NgForOf,
    PublicationReadonlyCardComponent
  ],
  templateUrl: './publications-view.component.html',
  styleUrl: './publications-view.component.css'
})
export class PublicationsViewComponent implements OnInit {
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
        publicationData.advisor_id = publication.advisor_id;
        this.publications.push(publicationData);
      });
    });
  }


}
