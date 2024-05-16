import {Component, Input} from '@angular/core';
import {Publication} from "../../models/publication.model";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'publication-readonly-card',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    DatePipe
  ],
  templateUrl: './publication-readonly-card.component.html',
  styleUrl: './publication-readonly-card.component.css'
})
export class PublicationReadonlyCardComponent {
  @Input() publication !: Publication;


  constructor() { }
}
