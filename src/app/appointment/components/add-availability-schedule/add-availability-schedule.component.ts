import { Component } from '@angular/core';
import {MatFormField, MatLabel } from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar
import { Router } from '@angular/router'; // Importa Router

import { AvailableDateApiService } from "../../services/available-date-api.service";
import { AdvisorApiService } from "../../../user/services/advisor-api.service";


@Component({
  selector: 'app-add-availability-schedule',
  standalone: true,
  imports: [
    MatFormField,
    MatButton,
    MatLabel,
    RouterLink,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './add-availability-schedule.component.html',
  styleUrl: './add-availability-schedule.component.css'
})
export class AddAvailabilityScheduleComponent {
  form !: FormGroup;

  constructor
  (private formBuilder: FormBuilder,
   private availableDateApiService: AvailableDateApiService,
   private advisorApiService: AdvisorApiService,
   private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      day: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required]
    }, { validators: this.dateNotEqualValidator });

  }

  dateNotEqualValidator(formGroup: FormGroup) {
    const startTimeControl = formGroup.get('startTime');
    const endTimeControl = formGroup.get('endTime');

    if (startTimeControl && endTimeControl) {
      const start_time = startTimeControl.value;
      const end_time = endTimeControl.value;

      if (start_time === end_time) {
        return { datesEqual: true };
      }
    }
    return null;
  }

  addAvailableDate() {
    if (this.form.valid) {
      const availableDate = this.form.value;
      const currentDate = new Date();
      const inputDate = new Date(availableDate.day);

      let dateParts = availableDate.day.split("-");
      availableDate.day = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

      // Comprueba si la fecha ingresada ya ha pasado
      if (currentDate > inputDate) {
        availableDate.status = 0;
      } else {
        availableDate.status = 1;
      }

      availableDate.advisor_id = this.advisorApiService.getAdvisorId();

      this.availableDateApiService.create(availableDate).subscribe(() => {
        console.log("Available date added successfully");
        this.snackBar.open('El horario ha sido agregado exitosamente.', 'Cerrar', {
          duration: 4000,
        }).afterDismissed().subscribe(() => {
          this.router.navigate(['/asesor/horarios']); // Navega a 'asesor/horarios' después de que el Snackbar se cierre
        });
      }, error => {
        console.log("Error adding available date: ");
      });
    }
  }


}
