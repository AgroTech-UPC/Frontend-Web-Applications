import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../public/components/dialog/dialog.component';
import { Resource } from '../../models/resource.model';
import { ResourceApiService} from "../../services/resource-api.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import { MatSelect } from '@angular/material/select';
import {BreederApiService} from "../../../user/services/breeder-api.service";

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
export class RegisterResourcesComponent implements OnInit {
  resource: Resource = {
    id: 0,
    name: "",
    type: "",
    breeder_id: 0,
    quantity: 0,
    date: new Date(),
    observations: ""
  };

  constructor(public dialog: MatDialog,
              private resourceService: ResourceApiService,
              private snackBar: MatSnackBar,
              private breederService: BreederApiService) {}

  ngOnInit() {
    this.resource.breeder_id = this.breederService.getBreederId();
  }

  openDialog(): void {
    this.dialog.open(DialogComponent);
  }

  handleClick(): void {
    if (!this.resource.name || !this.resource.type || !this.resource.breeder_id || !this.resource.quantity || !this.resource.date) {
      this.openDialog();
    } else {
      this.registerResource();
      this.snackBar.open('Recurso registrado con éxito', 'Cerrar', {
        duration: 2000,
      }).afterDismissed().subscribe(() => {
        window.history.back();
      });
    }
  }

  registerResource(): void {
    this.resourceService.create(this.resource).subscribe();
  }

  goBack() {
    window.history.back();
  }
}
