import {Component, OnInit, ViewChild} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule, NgForm} from "@angular/forms";
import { PublicationsApiService } from "../../services/publications-api.service";
import { Publication } from '../../models/publication.model';
import { Router } from '@angular/router';
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import { MatSnackBar } from '@angular/material/snack-bar';
import {AdvisorApiService} from "../../../user/services/advisor-api.service";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-new-publication',
  standalone: true,
    imports: [
        MatFormFieldModule,
        FormsModule,
        MatInput,
        MatButton,
        MatIcon
    ],
  templateUrl: './new-publication.component.html',
  styleUrl: './new-publication.component.css'
})
export class NewPublicationComponent implements OnInit {
  @ViewChild('publicationForm', {static: false})
  publicationForm! : NgForm;

  // datos de publicación para el formulario
  publicationData!: Publication;

  advisor_id = 0;

  constructor(private publicationsService: PublicationsApiService,
              private advisorService: AdvisorApiService,
              private router: Router,
              private snackBar: MatSnackBar) {
    this.publicationData = {} as Publication;
  }

  ngOnInit() {
    this.advisor_id = this.advisorService.getAdvisorId();
  }

  addPublication() {

    // obtener fecha actual en formato 2024-04-30T11:10:52Z
    let currentDate = new Date();
    let formattedDate = currentDate.toISOString();
    formattedDate = formattedDate.slice(0, -5) + 'Z';

    let newPublication: Publication = {
      id: 0,
      advisor_id: this.advisor_id,
      title: this.publicationData.title,
      description: this.publicationData.description,
      date: formattedDate,
      image: this.publicationData.image
    }

    this.publicationsService.create(newPublication).subscribe(() => {
      this.snackBar.open('Publicación creada con éxito🤩', 'Cerrar', {
        duration: 5000,
      });
      this.goToPublications();
    }, error => {
      this.snackBar.open('Error al crear la publicación😥', 'Cerrar', {
        duration: 5000,
      });
      console.error(error);
    });
  }


  goBack() {
    window.history.back();
  }

  goToPublications() {
    this.router.navigate(['/asesor/mis-publicaciones']);
  }

}
