import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../public/components/dialog/dialog.component';
import { Resource } from '../../models/resource.model';
import { ResourceService } from '../../services/resource-service/resource.service';
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
  resource: Resource = {
    id: -1,
    name: "",
    type: "",
    breeder_id: 1,
    quantity: 0,
    date: new Date(),
    observations: ""
  };

  constructor(public dialog: MatDialog, private resourceService: ResourceService, private snackBar: MatSnackBar, private router: Router) {}

  openDialog(): void {
    this.dialog.open(DialogComponent);
  }

  handleClick(): void {
    if (!this.resource.name || !this.resource.type || !this.resource.breeder_id || !this.resource.quantity || !this.resource.date) {
      this.openDialog();
    } else {
      this.registerResource();
      this.snackBar.open('Recurso registrado con éxito', 'Cerrar', {
        duration: 3000,
      }).afterDismissed().subscribe(() => {
        this.router.navigate(['/criador/registro']);
      });
    }
  }

  registerResource(): void {
    this.resourceService.getHighestId().subscribe(highestId => {
      this.resource.id = highestId + 1;
      this.resourceService.addResource(this.resource).subscribe();
    });
  }

  goBack() {
    window.history.back();
  }
}
