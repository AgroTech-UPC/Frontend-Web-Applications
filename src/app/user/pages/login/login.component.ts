import {Component, OnInit} from '@angular/core';
import {UserApiService} from "../../services/user-api.service";
import {Router, RouterLink} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private userApiService: UserApiService,
              private router: Router,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required ]
    });
  }

  login(){
    console.log("hola");
    this.userApiService.getAll().subscribe((data) => {
      console.log(data);
    });
  }

  loginAsBreeder() {
    this.router.navigateByUrl('/criador/mi-granja');
  }

  loginAsAdvisor() {
    this.router.navigateByUrl('/asesor/clientes');
  }

}
