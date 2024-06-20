import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatDatepickerModule, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

import {UserApiService} from "../../services/user-api.service";
import {AdvisorApiService} from "../../services/advisor-api.service";

import {User} from "../../models/user.model";
import {Advisor} from "../../models/advisor.model";
import {Breeder} from "../../models/breeder.model";
import {Observable} from "rxjs";
import {AuthenticationApiService} from "../../../iam/services/authentication-api.service";

@Component({
  selector: 'register-advisor',
  standalone: true,
    imports: [
        MatButton,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
        MatDatepickerModule,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatError,
        MatFormField,
        MatHint,
        MatNativeDateModule,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        MatSuffix,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './register-advisor.component.html',
  styleUrl: './register-advisor.component.css',
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-PE'}
  ]
})
export class RegisterAdvisorComponent {
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      location: new FormControl('', [Validators.required]),
      birthDate: new FormControl(null, [Validators.required]),
      description: new FormControl('', [Validators.required]),
      occupation: new FormControl('', [Validators.required]),
      experience: new FormControl('', [Validators.required, Validators.min(1), Validators.max(70)]),
      photo: new FormControl('', [Validators.required])
    }
  );
  minDate: Date;
  maxDate: Date;

  constructor(private dateAdapter: DateAdapter<Date>,
              private router: Router,
              private authenticationApiService: AuthenticationApiService,
              private userApiService: UserApiService,
              private advisorApiService: AdvisorApiService,
              private snackBar: MatSnackBar) {
    this.dateAdapter.setLocale('es-PE');
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 90, 0, 1);
    this.maxDate = new Date(currentYear - 18, 11, 31);
  }

  onSubmit() {
    this.authenticationApiService.signUp(this.registerForm.value.email, this.registerForm.value.password, 'ROLE_ADVISOR')
      .subscribe((data: any) => {
        // Iniciar sesión automáticamente para obtener el token del usuario
        this.authenticationApiService.signIn(this.registerForm.value.email, this.registerForm.value.password)
          .subscribe((response: any) => {
            let userId = response['id'];
            this.userApiService.setUserId(userId);
            this.userApiService.setLogged(true);

            // Crear un nuevo asesor
            const birthDate: Date = this.registerForm.value.birthDate;
            const birthDateString = birthDate.toISOString().split('T')[0];
            let advisor: Advisor = {
              id: 0,
              fullname: this.registerForm.value.name,
              location: this.registerForm.value.location,
              birthdate: birthDateString,
              description: this.registerForm.value.description,
              occupation: this.registerForm.value.occupation,
              experience: this.registerForm.value.experience,
              photo: this.registerForm.value.photo,
              rating: 0,
              userId: userId
            };
            this.advisorApiService.create(advisor).subscribe(
              (response) => {
                this.userApiService.setIsBreeder(false);
                this.advisorApiService.setAdvisorId(response.id);
                this.router.navigateByUrl('/asesor/clientes');
                this.snackBar.open('Bievenido ' + advisor.fullname + ' 🤗', 'Cerrar', {
                  duration: 2000
                });
              },
              error => {
                this.snackBar.open('Error al registrar el asesor😥', 'Cerrar', {
                  duration: 5000,
                });
                console.error(error);
              }
            );
          }, error => {
            this.snackBar.open('Error al iniciar sesión😥', 'Cerrar', {
              duration: 3000
            });
          });
      });
  }

  goBack() {
    window.history.back();
  }
}
