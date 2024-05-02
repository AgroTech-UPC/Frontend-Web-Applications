import {Component, OnInit} from '@angular/core';
import { MatSnackBar} from "@angular/material/snack-bar";
import {MatTableModule, MatTableDataSource} from "@angular/material/table";
import {AnimalService} from "../../services/animal-service/animal.service";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {MatDialog } from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../../public/components/confirmation-dialog/confirmation-dialog.component";
import {Observable} from "rxjs";
import {NgIf} from "@angular/common";
@Component({
  selector: 'cage-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButton,
    NgIf,
  ],
  templateUrl: './cage-list.component.html',
  styleUrl: './cage-list.component.css'
})
export class CageListComponent implements OnInit {
  length: number = 0;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'size', 'observations', 'actions'];
  constructor(private animalService: AnimalService,
              private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
  ) {  }

  ngOnInit() {
    this.getCages();
  }

  getCages(){
    this.animalService.getCages().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.length = data.length;
    });
  }

  editCage(id: number){
    this.router.navigate([`/criador/mis-animales/editar/${id}`]);
  }

  deleteCage(id: number){
    this.confirmDeletion(id).subscribe(result => {
      if(result) {
        this.animalService.getAnimals(id).subscribe((data) => {
          data.forEach((animal: any) => {
            this.animalService.deleteAnimal(animal.id).subscribe(() => {
              console.log(`Animal ${animal.id} deleted`);
            });
          });
        });
        this.animalService.deleteCage(id).subscribe(() => {
          this.getCages();
          this.snackBar.open('Jaula eliminada con exito 🎉', '', {
            duration: 5000
          });
        });
      }
      else{
        console.log(`Cancel delete cage ${id}`);
      }
    });
  }

  confirmDeletion(id: number): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
      {data : {
          message: `¿Estas seguro de querer eliminar la jaula ${id}? Se eliminará la información de todos los animales que contiene.`
        }
      });
    return dialogRef.afterClosed();
  }

  goToCage(id: number){
    this.router.navigate([`criador/mis-animales/${id}`]);
  }
}
