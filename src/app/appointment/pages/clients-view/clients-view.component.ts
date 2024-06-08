import {Component, OnInit} from '@angular/core';
import {ClientCardComponent} from "../../components/client-card/client-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {Appointment} from "../../models/appointment.model";
import {Client} from "../../models/client.model";
import {UserApiService} from "../../../user/services/user-api.service";
import {BreederApiService} from "../../../user/services/breeder-api.service";
import {AppointmentApiService} from "../../services/appointment-api.service";
import {AdvisorApiService} from "../../../user/services/advisor-api.service";
import {EmptyViewComponent} from "../../../public/components/empty-view/empty-view.component";

@Component({
  selector: 'app-clients-view',
  standalone: true,
  imports: [
    ClientCardComponent,
    NgForOf,
    EmptyViewComponent,
    NgIf
  ],
  templateUrl: './clients-view.component.html',
  styleUrl: './clients-view.component.css'
})
export class ClientsViewComponent implements OnInit {
  advisorId = 0;
  appointments: Appointment[] = [];
  clients: Client[] = [];

  constructor( private userService: UserApiService,
               private breederService: BreederApiService,
               private advisorService: AdvisorApiService,
               private appointmentService: AppointmentApiService) { }

  ngOnInit() {
    this.advisorId = this.advisorService.getAdvisorId();
    this.getAppointments();
  }

  getAppointments() {
    this.appointmentService.getAll().subscribe(appointments => {
      appointments.filter(appointment => appointment.advisorId === this.advisorId).forEach(appointment => {
        this.appointments.push(appointment);
      });
      this.getClients();
    });
  }

  getClients(){
    this.appointments.forEach(appointment => {
      this.breederService.getOne(appointment.breederId).subscribe(breeder => {
        this.userService.getOne(breeder.userId).subscribe(user => {
          let client = {
            id: breeder.id,
            appointmentId: appointment.id,
            fullname: user.fullname,
            appointmentStatus: appointment.status,
            location: user.location,
            cages: 0,
            description: user.description
          }
          this.clients.push(  client);
        });


      });
    });
  }
}
