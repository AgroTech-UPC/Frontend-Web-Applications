import {Component, OnInit} from '@angular/core';
import {UserApiService} from "../../services/user-api.service";
import {Router, RouterLink} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {User} from "../../models/user.model";
import {NgIf} from "@angular/common";
import {BreederApiService} from "../../services/breeder-api.service";
import {AdvisorApiService} from "../../services/advisor-api.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    RouterLink,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user = new User();
  errorMessage: string | null = null;

  constructor(private userApiService: UserApiService,
              private breederApiService: BreederApiService,
              private advisorApiService: AdvisorApiService,
              private router: Router,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required ]
    });

    if (this.userApiService.isLogged()) {
      if (this.userApiService.getIsBreeder()) {
        this.router.navigateByUrl('/criador/mi-granja');
      } else {
        this.router.navigateByUrl('/asesor/clientes');
      }
    }
  }

  login(){
    this.userApiService.getAll().subscribe((data) => {
      const user = data.find(user => user.email === this.loginForm.value.email);
      if (!user) {
        this.errorMessage="Error: el correo proporcionado no está registrado.";
      } else if (user.password !== this.loginForm.value.password) {
        this.errorMessage="Error: el correo y la contraseña proporcionada no coinciden.";
      } else {
        this.errorMessage = null;
        this.userApiService.setLogged(true);
        this.breederApiService.getAll().subscribe((data) => {
          const breeder = data.find(breeder => breeder.user_id === user.id);
          if (breeder) {
            this.userApiService.setIsBreeder(true);
            this.router.navigateByUrl('/criador/mi-granja');
          } else {
            this.advisorApiService.getAll().subscribe((data) => {
              const advisor = data.find(advisor => advisor.user_id === user.id);
              if (advisor) {
                this.userApiService.setIsBreeder(false);
                this.router.navigateByUrl('/asesor/clientes');
              }
            });
          }
        });
      }
    });
  }

}
