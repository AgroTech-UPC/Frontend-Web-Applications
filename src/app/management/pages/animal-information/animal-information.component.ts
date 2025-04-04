import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {Animal} from "../../models/animal.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AnimalApiService} from "../../services/animal-api.service";
import {Observable} from "rxjs";
import {NgIf} from "@angular/common";

import {ConfirmationDialogComponent} from "../../../public/components/confirmation-dialog/confirmation-dialog.component";

import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatIcon} from "@angular/material/icon";
import {MatOption, MatSelect} from "@angular/material/select";
import {FarmerApiService} from "../../../user/services/farmer-api.service";


@Component({
  selector: 'app-animal-information',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatCheckbox,
    MatIcon,
    MatSelect,
    MatOption,
    NgIf
  ],
  templateUrl: './animal-information.component.html',
  styleUrl: './animal-information.component.css'
})
export class AnimalInformationComponent implements OnInit{
  animalID: number = -1;
  isEditMode: boolean = false;
  animal: Animal = {
    id: 0,
    name: '',
    breed: '',
    gender: true,
    birthdate: new Date(),
    cageId: 0,
    weight: 0,
    isSick: false,
    observations: ''
  };
  isSick!: string;
  gender!: string;
  originalAnimal!: Animal;
  breed!: string;

  @ViewChild('animalForm', {static: false})
  animalForm! : NgForm;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private animalService: AnimalApiService,
              private breederService: FarmerApiService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.animalID = +this.route.snapshot.paramMap.get('id')!;
    this.getAnimal();
  }

  getAnimal() {
    this.animalService.getOne(this.animalID)
      .subscribe(
        (data) => {
          this.animal = data;
          this.gender = (this.animal.gender ? 'true': 'false');
          this.isSick = (this.animal.isSick ? 'true': 'false');
          this.originalAnimal = {...this.animal};
        },
        (error) => {
          console.error(error);
        }
      )
  }

  onSubmit() {
    if (this.animalForm.valid) {
      this.breederService.getCagesByFarmerId(this.breederService.getFarmerId()).subscribe(cages => {
        if (!cages.some(cage => cage.id === this.animal.cageId)) {
          this.snackBar.open('El número de jaula no existe', 'Cerrar', {
            duration: 2000,
          });
        }
        else{
          this.animal.gender = this.gender === 'true';
          this.animal.isSick = this.isSick === 'true';
          this.animalService.update(this.animalID, this.animal)
            .subscribe(
              (data) => {
                this.animal = data;
                this.originalAnimal = {...this.animal};
                this.isEditMode = false;
                this.snackBar.open('Información actualizada con éxito 🎉', 'Cerrar', {
                  duration: 5000
                });
              },
              (error) => {
                console.error(error);
              }
            )
        }
      });
    }
  }

  onCancel() {
    this.isEditMode = false;
    this.animal = {...this.originalAnimal};
  }

  editAnimal() {
    this.isEditMode = true;
  }

  deleteAnimal() {
    this.confirmMessage(this.animalID, `¿Estas seguro de querer eliminar la información del cuy ${this.animalID}?`).subscribe(result => {
      if(result) {
        this.animalService.delete(this.animalID).subscribe(() => {
          this.router.navigate([`/animales/${this.animal.cageId}`]);
          this.snackBar.open('Información eliminada con éxito 🎉', '', {
            duration: 5000
          });
        });
      }
      else{
        console.log(`Cancel delete animal ${this.animalID}`);
      }
    });
  }

  confirmMessage(id: number, message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
      {data : {
          message: message
        }
      });
    return dialogRef.afterClosed();
  }

  goBack() {
    window.history.back();
  }
}
