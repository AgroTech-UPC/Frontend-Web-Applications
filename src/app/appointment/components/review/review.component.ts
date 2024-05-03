import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Review} from "../../models/review.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {
  review: Review = {
    id: 0,
    appointment_id: 0,
    comment: "",
    rating: 0
  }

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.review.appointment_id = params['id'];
    });
  }

  onSubmit(){

  }

  onCancel(){

  }


}
