import { Component, EventEmitter, Output } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isOpen = false;

  @Output() toggleSidenav = new EventEmitter<boolean>();

  toggleDrawer() {
    this.isOpen = !this.isOpen;
    this.toggleSidenav.emit(this.isOpen);
  }
  closeDrawer() {
    this.isOpen = false;
  }
}
