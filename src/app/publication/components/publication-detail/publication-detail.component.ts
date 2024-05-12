import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PublicationsApiService } from "../../services/publications-api.service";
import {ActivatedRoute} from "@angular/router";
import {Publication} from "../../models/publication.model";
import {MatButton} from "@angular/material/button";
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-publication-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatButton,
    DatePipe
  ],
  templateUrl: './publication-detail.component.html',
  styleUrl: './publication-detail.component.css'
})
export class PublicationDetailComponent {
  publication = {} as Publication;

  constructor(private publicationsService: PublicationsApiService,
              private activatedRouter: ActivatedRoute,
              private snackBar: MatSnackBar) {
    this.activatedRouter.params.subscribe(
      params => {
        this.getAppointment(params['id']);
      }
    );
  }

  getAppointment(id: any) {
    this.publicationsService.getOne(id).subscribe((publication: Publication) => {
      this.publication = publication;
    });
  }

  deletePublication(id: any) {
    this.publicationsService.delete(id).subscribe(() => {
        this.snackBar.open('Publicación eliminada con éxito😎', 'Cerrar', {
          duration: 2000,
        }).afterDismissed().subscribe(() => { this.goBack() });
      }, error => {
        this.snackBar.open('Error al eliminar la publicación', 'Cerrar', {
          duration: 2000,
        });
      }
    );
  }

  goBack() {
    window.history.back();
  }
}
