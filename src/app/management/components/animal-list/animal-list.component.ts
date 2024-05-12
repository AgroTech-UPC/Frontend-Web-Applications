import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AnimalApiService} from "../../services/animal-api.service";
import {Animal} from "../../models/animal.model";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {forEach} from "lodash";

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
              private animalService: AnimalApiService,) {
  }

  ngOnInit() {
    this.cageID = +this.route.snapshot.paramMap.get('id')!;
    this.getAnimals();
  }

  getAnimals(){
    this.animalService.getAll().subscribe((data: any) => {
      this.animals = data.filter((animal: Animal) => animal.cage_id === this.cageID);
    });
  }

  getInformation(id: number){
    this.router.navigate(['informacion', id], {relativeTo: this.route});
  }

  goBack() {
    window.history.back();
  }
}
