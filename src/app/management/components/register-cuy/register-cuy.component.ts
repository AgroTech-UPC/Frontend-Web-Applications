import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../public/components/dialog/dialog.component';
import { Animal } from '../../models/animal.model';
import {AnimalApiService} from "../../services/animal-api.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-register-cuy',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    MatRadioGroup,
    MatRadioButton,
    MatOption,
    MatSelect
  ],
  templateUrl: './register-cuy.component.html',
  styleUrl: './register-cuy.component.css'
})
export class RegisterCuyComponent {
  animal: Animal = {
    id: 0,
    name: "",
    breed: "",
    gender: false,
    birthdate: new Date(),
    cage_id: 0,
    weight: 0,
    status: "",
    observations: ""
  };

  constructor(public dialog: MatDialog, private animalService: AnimalApiService, private snackBar: MatSnackBar) {}

  openDialog(): void {
    this.dialog.open(DialogComponent);
  }

  handleClick(): void {
    if (!this.animal.name || !this.animal.breed  || !this.animal.cage_id ||
      !this.animal.weight || !this.animal.birthdate || !this.animal.status) {
      this.openDialog();
    } else {
      this.animal.gender = this.animal.gender === true; // required to convert the value to a boolean instead of a string
      this.registerCuy();
      this.snackBar.open('Registrado con éxito', 'Cerrar', {
        duration: 2000,
      }).afterDismissed().subscribe(() => {
        window.history.back();
      });
    }
  }

  registerCuy(): void {
    this.animalService.create(this.animal).subscribe();
  }

  goBack() {
    window.history.back();
  }

}
