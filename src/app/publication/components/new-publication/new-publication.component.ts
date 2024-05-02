import {Component, OnInit, ViewChild} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule, NgForm} from "@angular/forms";
import { PublicationsApiService } from "../../services/publications-api.service";
import { Publication } from '../../models/publication.model';
import { Router } from '@angular/router';
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-publication',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInput,
    MatButton
  ],
  templateUrl: './new-publication.component.html',
  styleUrl: './new-publication.component.css'
})
export class NewPublicationComponent implements OnInit {
  @ViewChild('publicationForm', {static: false})
  publicationForm! : NgForm;

  // datos de publicación para el formulario
  publicationData!: Publication;

  dataSource: any;

  constructor(private publicationsService: PublicationsApiService,
              private router: Router,
              private snackBar: MatSnackBar) {
    this.publicationData = {} as Publication;
  }

  ngOnInit() {
    this.getPublications();
  }

  getPublications(){
    this.publicationsService.getPublications().subscribe((response: any) => {
      this.dataSource = response;
    });
  }

  addPublication() {
    // obtener el id más alto de la lista de publicaciones
    let maxID: number = 0;
    maxID = this.dataSource.reduce((max: number, publication: any) =>
      parseInt(publication.id) > max ? parseInt(publication.id) : max, 0);
    this.publicationData.id = (Number(maxID)+1).toString();
    this.publicationData.advisor_id= '1';

    // obtener fecha actual en formato 2024-04-30T11:10:52Z
    let currentDate = new Date();
    let formattedDate = currentDate.toISOString();
    formattedDate = formattedDate.slice(0, -5) + 'Z';
    this.publicationData.date = formattedDate;

    this.publicationData.is_active = true;

    console.log(this.publicationData);

    this.publicationsService.createPublication(this.publicationData).subscribe(() => {
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
