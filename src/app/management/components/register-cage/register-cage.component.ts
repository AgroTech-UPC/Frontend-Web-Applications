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
import { Router } from '@angular/router';
import {Animal} from "../../models/animal.model";
import {CageApiService} from "../../services/cage-api.service";


@Component({
  selector: 'app-register-cage',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule
  ],

  templateUrl: './register-cage.component.html',
  styleUrl: './register-cage.component.css'
})
export class RegisterCageComponent {
  cage: Cage = {
    id: 0,
    name: '',
    size: 0,
    observations: ''
  };

  constructor(public dialog: MatDialog, private cageService: CageApiService, private snackBar: MatSnackBar, private router: Router) {}
  openDialog(): void {
    this.dialog.open(DialogComponent);
  }

  handleClick(): void {
    if (!this.cage.name || !this.cage.size) {
      this.openDialog();
    } else {
      this.registerCage();
      this.snackBar.open('Registrado con éxito', 'Cerrar', {
        duration: 3000,
      }).afterDismissed().subscribe(() => {
        this.router.navigate(['/criador/registro']);
      });
    }
  }

  registerCage(): void {
    this.cageService.create(this.cage).subscribe();
  }
  goBack() {
    window.history.back();
  }

}
