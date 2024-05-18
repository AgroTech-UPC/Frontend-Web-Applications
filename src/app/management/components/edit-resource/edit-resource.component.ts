import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {CommonModule, Location} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ResourceApiService} from "../../services/resource-api.service";

@Component({
  selector: 'app-edit-resource',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatRadioButton,
    MatRadioGroup,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './edit-resource.component.html',
  styleUrl: './edit-resource.component.css'
})
export class EditResourceComponent implements OnInit{
  resource: any = {
    name: '',
    type: '',
    quantity: '',
    date: '',
    observations: ''
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resourceApiService: ResourceApiService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadResource(id);
    }
  }

  private loadResource(id: string) {
    this.resourceApiService.getOne(id).subscribe((expense: any) => {
      this.resource = expense;
    }, error => {
      console.error('Error loading resource', error);
    });
  }

  handleClick(): void {
    this.resourceApiService.update(this.resource.id, this.resource).subscribe(() => {
      console.log('Recurso actualizado con éxito');
      this.router.navigate(['/criador/mi-granja/recursos']);
    }, error => {
      console.error('Error updating resource', error);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
