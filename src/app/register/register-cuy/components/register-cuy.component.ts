import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { Cuy } from '../models/cuy.model';
import { CuyServiceService as CuyService } from '../services/cuy-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";

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
    MatRadioButton
  ],
  templateUrl: './register-cuy.component.html',
  styleUrl: './register-cuy.component.css'
})
export class RegisterCuyComponent {
  id: string = '';
  specie: string = '';
  weight:string = '';
  name: string = '';
  breed: string = '';
  birth: string = '';
  gender: string = '';
  observations: string = '';
  cage_id: string = '';
  cuy: Cuy = {
    id: '',
    specie: '',
    weight: '',
    name: '',
    breed: '',
    birth: '',
    gender: '',
    observations: '',
    cage_id: ''
  };

  constructor(public dialog: MatDialog, private cuyService: CuyService, private snackBar: MatSnackBar, private router: Router) {}

  openDialog(): void {
    this.dialog.open(DialogComponent);
  }

  handleClick(): void {
    if (!this.name || !this.specie || !this.id) {
      this.openDialog();
    } else {
      this.registerCuy();
      this.snackBar.open('Registrado con éxito', 'Cerrar', {
        duration: 3000,
      }).afterDismissed().subscribe(() => {
        this.router.navigate(['/register']);
      });
    }
  }

  registerCuy(): void {
    this.cuy = {
      id: this.id,
      specie: this.specie,
      weight: this.weight,
      name: this.name,
      breed: this.breed,
      birth: this.birth,
      gender: this.gender,
      observations: this.observations,
      cage_id: this.cage_id
    };
    this.cuyService.addCuy(this.cuy).subscribe();
  }

}
