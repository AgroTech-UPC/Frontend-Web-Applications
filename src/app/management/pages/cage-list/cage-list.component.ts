import {Component, OnInit} from '@angular/core';
import { MatSnackBar} from "@angular/material/snack-bar";
import {MatTableModule, MatTableDataSource} from "@angular/material/table";
import {CageApiService} from "../../services/cage-api.service";
import {AnimalApiService} from "../../services/animal-api.service";
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatDialog } from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../../public/components/confirmation-dialog/confirmation-dialog.component";
import {Observable} from "rxjs";
import {NgIf} from "@angular/common";
import {CageTableComponent} from "../../components/cage-table/cage-table.component";
import {Cage} from "../../models/cage.model";
import {FarmerApiService} from "../../../user/services/farmer-api.service";


@Component({
  selector: 'cage-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    NgIf,
    CageTableComponent,
    RouterLink,
    MatIcon
  ],
  templateUrl: './cage-list.component.html',
  styleUrl: './cage-list.component.css'
})
export class CageListComponent implements OnInit {
  length: number = 0;
  dataSource!: MatTableDataSource<any>;
  constructor(private cageService: CageApiService,
              private animalService: AnimalApiService,
              private breederService: FarmerApiService,
              private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
  ) {  }

  ngOnInit() {
    this.getCages();
  }

  getCages(){
    this.breederService.getCagesByFarmerId(this.breederService.getFarmerId()).subscribe((cages: Cage[]) => {
      this.dataSource = new MatTableDataSource(cages);
      this.length = cages.length;
    });
  }

  editCage(id: number){
    this.router.navigate([`/granjero/mis-animales/editar/${id}`]);
  }

  deleteCage(id: number){
    this.confirmDeletion(id).subscribe(result => {
      if(result) {
        this.animalService.getAll().subscribe((data) => {
          data.forEach((animal: any) => {
            if(animal.cageId === id){
              this.animalService.delete(animal.id).subscribe(
                () => {
                  console.log(`Animal ${animal.id} deleted`);
                }
              );
            }
          });
        });
        this.cageService.delete(id).subscribe(() => {
          this.getCages();
          this.snackBar.open('Jaula eliminada con exito 🎉', '', {
            duration: 5000
          });
        }, error => {
          console.error('Error deleting cage', error);
          this.snackBar.open('Error al eliminar la jaula😥', '', {
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
    this.router.navigate([`granjero/mis-animales/${id}`]);
  }
}
