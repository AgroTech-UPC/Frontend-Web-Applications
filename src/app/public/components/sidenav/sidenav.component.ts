import {Component, Input, ViewChild} from '@angular/core';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import { trigger, transition, style, animate } from '@angular/animations';
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterLink,
    NgForOf,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SidenavComponent {
  isOpen = false;
  @ViewChild('drawer') drawer!: MatDrawer;

  onToggleSidenav(isOpen: boolean) {
    isOpen ? this.drawer.open() : this.drawer.close();
  }

  closeDrawer() {
    this.isOpen = false;
  }

  @Input() isBreeder: boolean;

  constructor() {
    this.isBreeder = true;
  }

  getSidebarButtons(): string[] {
    if (this.isBreeder) {
      return ["Mi granja", "Asesores", "Mis animales", "Registro", "Notificaciones"];
    } else {
      return ["Clientes", "Notificaciones", "Mis publicaciones"];
    }
  }

  getButtonRoute(button: string): string {
    switch (button) {
      case "Mi granja":
        return "criador/mi-granja";
      case "Asesores":
        return "criador/asesores";
      case "Mis animales":
        return "criador/mis-animales";
      case "Registro":
        return "criador/registro";
      case "Notificaciones":
        return "notificaciones";
      case "Clientes":
        return "asesor/clientes";
      case "Mis publicaciones":
        return "asesor/mis-publicaciones";
      default:
        return "/";
    }
  }
}
