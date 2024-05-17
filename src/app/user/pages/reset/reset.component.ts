import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";
import {UserApiService} from "../../services/user-api.service";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatInput,
    MatButton,
    MatCardModule
  ],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export class ResetComponent implements OnInit{
  form!: FormGroup;
  errorMessage: string | null = null;
  user_id!: number;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userApiService: UserApiService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });

    this.user_id = +this.activatedRoute.snapshot.paramMap.get('id')!;
  }

  onSubmit(){
    if(this.form.valid){
      if(this.form.value.password === this.form.value.confirmPassword){
        this.userApiService.getOne(this.user_id).subscribe(user => {
          user.password = this.form.value.password;
          this.userApiService.update(this.user_id, user).subscribe(() => {
            this.errorMessage = null;
            this.form.reset();
            this.router.navigateByUrl('/login');
          });
        });
      } else {
        this.errorMessage = "Las contraseñas no coinciden.";
      }

    }
  }
}
