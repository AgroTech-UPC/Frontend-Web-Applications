import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../dialog/dialog.component';
import { Cage } from '../../model/cage.model';
import { CageService } from '../../services/cage-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


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
  id: string = '';
  name: string = '';
  size: string = '';
  observations: string = '';
  cage: Cage = {
    id: '',
    name: '',
    size: '',
    observations: ''
  };

  constructor(public dialog: MatDialog, private cageService: CageService, private snackBar: MatSnackBar, private router: Router) {}
  openDialog(): void {
    this.dialog.open(DialogComponent);
  }

  handleClick(): void {
    if (!this.name || !this.size || !this.id) {
      this.openDialog();
    } else {
      this.registerCage();
      this.snackBar.open('Registrado con éxito', 'Cerrar', {
        duration: 3000,
      }).afterDismissed().subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  registerCage(): void {
      this.cage = {
        id: this.id,
        name: this.name,
        size: this.size,
        observations: this.observations
      };
      this.cageService.addCage(this.cage).subscribe();
  }

}
