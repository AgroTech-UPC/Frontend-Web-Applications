import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AnimalService} from "../../services/animal-service/animal.service";
import {Animal} from "../../models/animal.model";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatButton,
    MatIcon,
    NgClass
  ],
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.css'
})
export class AnimalListComponent implements OnInit{
  animals: Animal[] = [];

  cageID = -1;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private animalService: AnimalService,) {
  }

  ngOnInit() {
    this.cageID = +this.route.snapshot.paramMap.get('id')!;
    this.getAnimals();
  }

  getAnimals(){
    this.animalService.getAnimals(this.cageID)
      .subscribe((data: any) => {
        this.animals = data;
      });
  }

  getInformation(id: number){
    this.router.navigate(['informacion', id], {relativeTo: this.route});
  }

  goBack() {
    window.history.back();
  }
}
