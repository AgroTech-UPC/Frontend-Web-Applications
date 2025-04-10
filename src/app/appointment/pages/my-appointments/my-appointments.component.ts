import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {Appointment} from "../../models/appointment.model";
import {FarmerApiService} from "../../../user/services/farmer-api.service";
import {AdvisorApiService} from "../../../user/services/advisor-api.service";
import {AppointmentApiService} from "../../services/appointment-api.service";
import {UserApiService} from "../../../user/services/user-api.service";
import {ProfileApiService} from "../../../profile/services/profile-api.service";
import {Router} from "@angular/router";
import {forEach} from "lodash";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-my-appointments',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    NgForOf,
    NgIf,
    MatCardContent
  ],
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.css'
})

export class MyAppointmentsComponent implements OnInit {

  farmerId = 0;
  advisorId = 0;
  appointments: Appointment[] = [];
  profileDetails: any = {};
  isFarmer = false;

  constructor(
    private farmerApiService: FarmerApiService,
    private advisorApiService: AdvisorApiService,
    private appointmentApiService: AppointmentApiService,
    private userApiService: UserApiService,
    private profileApiService: ProfileApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isFarmer = this.userApiService.getIsFarmer();
    if (this.isFarmer)
      this.farmerId = this.farmerApiService.getFarmerId();
    else
      this.advisorId = this.advisorApiService.getAdvisorId();
    this.getMyAppointments();
  }

  getMyAppointments() {
    // Get all appointments for the farmer
    if (this.isFarmer) {
      this.appointmentApiService.getAppointmentsByFarmerId(this.farmerId).subscribe(appointments => {
        forEach(appointments, (appointment) => {
          if (appointment.status === 'PENDING') {
            this.appointments.push(appointment);
            this.advisorApiService.getOne(appointment.advisorId).subscribe(advisor => {
              this.profileApiService.getProfileByUserId(advisor.userId).subscribe(profile => {
                this.profileDetails[advisor.id] = {
                  fullname: `${profile.firstName} ${profile.lastName}`,
                  photo: profile.photo
                };
              });
            })
          }
        });
      });
    }
    else {
      // Get all appointments for the advisor
      this.appointmentApiService.getAppointmentsByAdvisorId(this.advisorId).subscribe(appointments => {
        forEach(appointments, (appointment) => {
          if (appointment.status === 'PENDING') {
            this.appointments.push(appointment);
            this.farmerApiService.getOne(appointment.farmerId).subscribe(farmer => {
              this.profileApiService.getProfileByUserId(farmer.userId).subscribe(profile => {
                this.profileDetails[farmer.id] = {
                  fullname: `${profile.firstName} ${profile.lastName}`,
                  photo: profile.photo
                };
              });
            })
          }
        });
      });
    }

  }

  formatDate(dateTime: string): string {
    const date = new Date(dateTime);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript comienzan desde 0
    // pasar a texto el mes
    const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const monthText = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} de ${monthText} de ${year}`;
  }

  goToAppointmentDetail(appointmentId: number): void {
    if (this.isFarmer)
      this.router.navigate([`/granjero/citas/${appointmentId}`]);
    else
      this.router.navigate([`/asesor/citas/${appointmentId}`]);
  }

  goToAppointmentHistory(): void {
    if (this.isFarmer)
      this.router.navigate([`/granjero/historial-citas`]);
    else
      this.router.navigate([`/asesor/historial-citas`]);
  }

  /**
  getMyAdvisors(): void {
    this.profileApiService.getAdvisors().subscribe(profiles => {
      this.profiles = profiles;
      forEach(this.profiles, (profile) => {
        this.advisorApiService.getAdvisorByUserId(profile.userId).subscribe(advisor => {
          this.advisors.push(advisor);
        })
      })
    });
    this.advisorApiService.getAll().subscribe(advisors => {
      this.advisors = advisors;
      this.appointmentApiService.getAll().subscribe(appointments => {
        let advisorAppointments: Appointment[][] = []; // Initialize as array of arrays
        this.advisors.forEach(advisor => {
          // Push the filtered appointments into the corresponding sub-array
          advisorAppointments[advisor.id - 1] = appointments.filter(appointment => appointment.advisorId === advisor.id &&
            appointment.farmerId === this.farmerId);
        });
        //if advisorAppointments[advisor.id - 1] is empty, then the advisor has no appointments with the breeder
        // and has to be removed from the list of advisors
        this.advisors = this.advisors.filter(advisor => advisorAppointments[advisor.id - 1].length > 0);

        this.filteredAdvisors = [...this.advisors];
        this.filteredAdvisors.forEach(advisor => {
          this.profileApiService.getProfileByUserId(advisor.userId).subscribe(profile => {
            this.advisorDetails[advisor.userId] = {
              fullname: `${profile.firstName} ${profile.lastName}`,
              photo: profile.photo
            };
          })

        });
        //Get all appointments for each advisor in an array
        this.filteredAdvisors.forEach(advisor => {
          this.appointmentsPerAdvisor[advisor.id] = appointments.filter(appointment => appointment.advisorId === advisor.id
            && appointment.farmerId === this.farmerId);
        });
      });
    });
  }

  filter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchValue = inputElement.value.replace(/[^a-zA-Z ]/g, '');

    if (this.searchValue === '') {
      this.filteredAdvisors = this.advisors;
    } else {
      this.filteredAdvisors = this.advisors.filter(advisor => {
          return this.advisorDetails[advisor.userId]?.fullname.toLowerCase().includes(this.searchValue.toLowerCase());
        }
      );
    }
  }

  // Excepcion para mostrar el mensaje de error si existen appointments pero todos estan reseñados
  allAdvisorsAppointmentsReviewed(): boolean {
    return this.filteredAdvisors.every(advisor => this.getAppointmentsByAdvisor(advisor.id).length === 0);
  }

  // BOTONES REDIRECCIONAR:
  navigateToAdvisorsSearch() {
    this.router.navigate([`/granjero/buscar-asesor`]);
  }
  navigateToMyAdvisors() {
    this.router.navigate([`/granjero/mis-asesores`]);
  }

  giveReview(id: number){
    this.router.navigate([`/granjero/mis-asesores/${id}`]);
  }
   */


}
