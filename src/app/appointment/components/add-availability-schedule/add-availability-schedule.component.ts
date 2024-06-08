import {Component, OnInit} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar
import { Router } from '@angular/router'; // Importa Router
import { AvailableDate } from "../../models/available_date.model";
import { AvailableDateApiService } from "../../services/available-date-api.service";
import { AdvisorApiService } from "../../../user/services/advisor-api.service";
import {NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";


@Component({
  selector: 'app-add-availability-schedule',
  standalone: true,
    imports: [
        MatFormField,
        MatButton,
        MatLabel,
        RouterLink,
        MatInput,
        ReactiveFormsModule,
        MatError,
        NgIf,
        MatIcon
    ],
  templateUrl: './add-availability-schedule.component.html',
  styleUrl: './add-availability-schedule.component.css'
})
export class AddAvailabilityScheduleComponent implements OnInit{
  form !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private availableDateApiService: AvailableDateApiService,
    private advisorApiService: AdvisorApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required]
    }, { validators: this.validTimeValidator });

  }

  validTimeValidator(formGroup: FormGroup) {
    const startTimeControl = formGroup.get('start_time');
    const endTimeControl = formGroup.get('end_time');
    if (startTimeControl && endTimeControl) {
      const start_time = startTimeControl.value;
      const end_time = endTimeControl.value;
      if (start_time.replace(":", "") >= end_time.replace(":", "")) {
        return { invalidTime: true };
      }
    }
    return null;
  }

  addAvailableDate() {
    if (this.form.valid) {
      const availableDate = this.form.value;
      const currentDate = new Date();
      const inputDate = new Date(availableDate.date);
      let dateParts = availableDate.date.split("-");
      availableDate.date = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;

      // Comprueba si la fecha ingresada ya ha pasado
      if (currentDate > inputDate) {
        availableDate.status = 0;
      } else {
        availableDate.status = 1;
      }

      availableDate.advisor_id = this.advisorApiService.getAdvisorId();

      const newAvailableDate: AvailableDate = {
        id: 0,
        advisorId: availableDate.advisorId,
        date: availableDate.date,
        startTime: availableDate.startTime,
        endTime: availableDate.endTime,
        status: availableDate.status
      };

      this.availableDateApiService.create(newAvailableDate).subscribe(() => {
        console.log("Available date added successfully");
        this.snackBar.open('El horario ha sido agregado exitosamente.', 'Cerrar', {
          duration: 2000,
        }).afterDismissed().subscribe(() => {
          this.router.navigate(['/asesor/horarios']); // Navega a 'asesor/horarios' después de que el Snackbar se cierre
        });
      }, error => {
        console.log("Error adding available date");
      });
    }
    else{
      console.log("Form is invalid");
    }
  }


}
