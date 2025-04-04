import {Component, Input, ViewChild} from '@angular/core';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {trigger, transition, style, animate} from '@angular/animations';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgForOf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {UserApiService} from "../../../user/services/user-api.service";
import {FarmerApiService} from "../../../user/services/farmer-api.service";
import {AdvisorApiService} from "../../../user/services/advisor-api.service";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterLink,
    RouterLinkActive,
    NgForOf,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('5ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        animate('5ms ease-in-out', style({opacity: 0}))
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

  @Input() isFarmer: boolean;

  constructor(private userApiService: UserApiService,
              private breederApiService: FarmerApiService,
              private advisorApiService: AdvisorApiService) {
    this.isFarmer = this.userApiService.getIsFarmer();
  }

  getSidebarButtons(): string[] {
    this.isFarmer = this.userApiService.getIsFarmer();
    if (this.isFarmer) {
      return ["Mi granja", "Asesores", "Mis animales", "Publicaciones", "Notificaciones", "Calendario"];
    } else {
      return ["Clientes", "Notificaciones", "Mis publicaciones", "Horarios", "Calendario"];
    }
  }

  getButtonRoute(button: string): string {
    switch (button) {
      case "Mi granja":
        return "granjero/mi-granja";
      case "Asesores":
        return "granjero/buscar-asesor";
      case "Mis animales":
        return "granjero/mis-animales";
      case "Publicaciones":
        return "granjero/publicaciones";
      case "Notificaciones":
        return this.isFarmer ? "granjero/notificaciones" : "asesor/notificaciones";
      case "Clientes":
        return "asesor/clientes";
      case "Mis publicaciones":
        return "asesor/mis-publicaciones";
      case "Calendario":
        return this.isFarmer ? "granjero/calendario" : "asesor/calendario";
      case "Horarios":
        return "asesor/horarios";
      default:
        return "/";
    }
  }

  logOut() {
    this.userApiService.setLogged(false);
    this.userApiService.setUserId(0);
    this.userApiService.clearToken();
    this.breederApiService.setFarmerId(0);
    this.advisorApiService.setAdvisorId(0);
    this.onToggleSidenav(false);
    this.isOpen = false;
  }
}
