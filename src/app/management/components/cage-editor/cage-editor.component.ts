import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {FormsModule, NgForm} from "@angular/forms";
import {AnimalService} from "../../services/animal.service";
import {Cage} from "../../models/cage.model";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-cage-editor',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    FormsModule,
    MatLabel
  ],
  templateUrl: './cage-editor.component.html',
  styleUrl: './cage-editor.component.css'
})
export class CageEditorComponent implements OnInit {
  cageID = -1;
  cage: Cage = {
    id: -1,
    name: '',
    size: 0,
    observations: ''
  }
  @ViewChild('cageForm', {static: false})
  cageForm! : NgForm;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private animalService: AnimalService,
              private snackBar: MatSnackBar) {  }

  ngOnInit() {
    this.cageID = +this.route.snapshot.paramMap.get('id')!;
    this.getCage(this.cageID);
  }

  getCage(id: number){
    this.animalService.getCage(id).subscribe((data) => {
      this.cage = {
        id: data.id,
        name: data.name,
        size: data.size,
        observations: data.observations
      }
    });
  }

  onSubmit(){
    if(this.cageForm.form.valid){
      this.animalService.updateCage(this.cage)
        .subscribe(() => {
        this.router.navigate(['/animales']);
        this.snackBar.open('Jaula actualizada 🎉', '', { duration: 5000 });
      });
    }
  }

  onCancel(){
    this.router.navigate(['/animales']);
  }
}
