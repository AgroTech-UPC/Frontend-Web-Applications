import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { Resource } from '../models/resource.model';
import { ResourceService } from '../services/resource-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-register-resources',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    MatRadioButton,
    MatRadioGroup,
    MatSelect
  ],
  templateUrl: './register-resources.component.html',
  styleUrls: ['./register-resources.component.css']
})
export class RegisterResourcesComponent {
  id: string = '';
  name: string = '';
  type: string = '';
  breeder_id: string = '';
  quantity: string = '';
  date: string = '';
  observations: string = '';
  resource: Resource = {
    id: '',
    name: '',
    type: '',
    breeder_id: '',
    quantity: '',
    date: '',
    observations: ''
  };

  constructor(public dialog: MatDialog, private resourceService: ResourceService, private snackBar: MatSnackBar, private router: Router) {}

  openDialog(): void {
    this.dialog.open(DialogComponent);
  }

  handleClick(): void {
    if (!this.name || !this.type || !this.breeder_id || !this.quantity || !this.date) {
      this.openDialog();
    } else {
      this.registerResource();
      this.snackBar.open('Recurso registrado con éxito', 'Cerrar', {
        duration: 3000,
      }).afterDismissed().subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  registerResource(): void {
    this.resourceService.getHighestId().subscribe(highestId => {
      this.resource = {
        id: (highestId + 1).toString(), // Convert the new ID to a string
        name: this.name,
        type: this.type,
        breeder_id: this.breeder_id,
        quantity: this.quantity,
        date: this.date,
        observations: this.observations
      };
      this.resourceService.addResource(this.resource).subscribe();
    });
  }
}
