import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../public/components/dialog/dialog.component';
import { Cage } from '../../models/cage.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import {CageApiService} from "../../services/cage-api.service";
import {FarmerApiService} from "../../../user/services/farmer-api.service";
import {MatIcon} from "@angular/material/icon";


@Component({
  selector: 'app-register-cage',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    MatIcon
  ],

  templateUrl: './register-cage.component.html',
  styleUrl: './register-cage.component.css'
})
export class RegisterCageComponent {
  cage: Cage = {
    id: 0,
    farmerId: 0,
    name: '',
    size: 0,
    observations: ''
  };

  constructor(public dialog: MatDialog,
              private cageService: CageApiService,
              private snackBar: MatSnackBar,
              private breederService: FarmerApiService) {
    this.cage.farmerId = this.breederService.getFarmerId();
  }

  openDialog(): void {
    this.dialog.open(DialogComponent);
  }

  handleClick(): void {
    if (!this.cage.name || !this.cage.size) {
      this.openDialog();
    } else {
      this.registerCage();
    }
  }

  registerCage(): void {
    this.cageService.create(this.cage).subscribe(() => {
      this.snackBar.open('Jaula registrada con éxito☺', 'Cerrar', {
        duration: 2000,
      }).afterDismissed().subscribe(() => {
        window.history.back();
      });
    }, error => {
      this.snackBar.open('Error al registrar la jaula😔', 'Cerrar', {
        duration: 2000
      });
    });
  }
  goBack() {
    window.history.back();
  }

}
