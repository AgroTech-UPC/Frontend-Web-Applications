import {Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserApiService} from "../../services/user-api.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormField,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    MatError,
    MatLabel,
    RouterLink
  ],
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.css'
})
export class RecoveryComponent implements OnInit{
  form!: FormGroup;
  errorMessage: string | null = null;
  constructor(private formBuilder: FormBuilder,
              private userApiService: UserApiService,
              private router: Router) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.userApiService.getAll().subscribe(users => {
      const user = users.find(user => user.email === this.form.value.email);
      if (user) {
        this.router.navigateByUrl(`/login/recuperacion/${user.id}`);
      } else {
        this.errorMessage = "No se encontró ningún usuario con ese correo electrónico.";
      }
    });
  }
}
