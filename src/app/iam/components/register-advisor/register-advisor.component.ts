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

import {UserApiService} from "../../../user/services/user-api.service";
import {AdvisorApiService} from "../../../user/services/advisor-api.service";
import {Advisor} from "../../../user/models/advisor.model";
import {AuthenticationApiService} from "../../services/authentication-api.service";
import {StorageService} from "../../../shared/services/storage.service";
import {MatIcon} from "@angular/material/icon";
import {Profile} from "../../../user/models/profile.model";
import {ProfileApiService} from "../../../user/services/profile-api.service";

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
    ReactiveFormsModule,
    MatIcon
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
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      birthDate: new FormControl(null, [Validators.required]),
      description: new FormControl('', [Validators.required]),
      occupation: new FormControl('', [Validators.required]),
      experience: new FormControl('', [Validators.required, Validators.min(1), Validators.max(70)])
    }
  );
  minDate: Date;
  maxDate: Date;
  photo: any;
  selectedFileName = '';

  constructor(private dateAdapter: DateAdapter<Date>,
              private router: Router,
              private authenticationApiService: AuthenticationApiService,
              private userApiService: UserApiService,
              private advisorApiService: AdvisorApiService,
              private profileApiService: ProfileApiService,
              private snackBar: MatSnackBar,
              private storageService: StorageService) {
    this.dateAdapter.setLocale('es-PE');
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 90, 0, 1);
    this.maxDate = new Date(currentYear - 18, 11, 31);
  }

  uploadImage(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFileName = file.name;
      console.log(file);
      let reader= new FileReader();
      let name = "PROFILEPHOTO_IMAGE_" + Date.now();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        console.log(reader.result);
        this.storageService.uploadFile(name, reader.result).then((url) => {
          console.log(url);
          this.photo = url;
        });
      }
    }
  }

  onSubmit() {
    if (this.selectedFileName === '') {
      this.snackBar.open('Debe seleccionar una foto de perfil 📷', 'Cerrar', {
        duration: 2000
      });
      return;
    }
    if (this.photo == null) {
      this.snackBar.open('Error al subir la foto de perfil😓', 'Cerrar', {
        duration: 2000
      });
      return;
    }
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
              rating: 0,
              userId: userId
            };
            this.advisorApiService.create(advisor).subscribe(
              (response) => {

                // Crear el perfil del asesor
                let profile: Profile = {
                  id: 0,
                  userId: userId,
                  firstName: this.registerForm.value.firstName,
                  lastName: this.registerForm.value.lastName,
                  city: this.registerForm.value.city,
                  country: this.registerForm.value.country,
                  birthDate: birthDateString,
                  description: this.registerForm.value.description,
                  photo: this.photo,
                  occupation: this.registerForm.value.occupation,
                  experience: this.registerForm.value.experience
                };

                this.profileApiService.create(profile).subscribe(
                  (response) => {
                    this.userApiService.setIsFarmer(false);
                    this.advisorApiService.setAdvisorId(response.id);
                    this.router.navigateByUrl('/asesor/clientes');
                    this.snackBar.open('Bievenido ' + profile.firstName + ' 🤗', 'Cerrar', {
                      duration: 2000
                    });
                  }
                )
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
