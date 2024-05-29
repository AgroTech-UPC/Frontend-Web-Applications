import {Component, OnInit} from '@angular/core';
import {ClientCardComponent} from "../../components/client-card/client-card.component";
import {NgForOf} from "@angular/common";
import {Appointment} from "../../models/appointment.model";
import {Client} from "../../models/client.model";
import {UserApiService} from "../../../user/services/user-api.service";
import {BreederApiService} from "../../../user/services/breeder-api.service";
import {AppointmentApiService} from "../../services/appointment-api.service";
import {AdvisorApiService} from "../../../user/services/advisor-api.service";

@Component({
  selector: 'app-clients-view',
  standalone: true,
    imports: [
        ClientCardComponent,
        NgForOf
    ],
  templateUrl: './clients-view.component.html',
  styleUrl: './clients-view.component.css'
})
export class ClientsViewComponent implements OnInit {
  advisor_id = 0;
  appointments: Appointment[] = [];
  clients: Client[] = [];

  constructor( private userService: UserApiService,
               private breederService: BreederApiService,
               private advisorService: AdvisorApiService,
               private appointmentService: AppointmentApiService) { }

  ngOnInit() {
    this.advisor_id = this.advisorService.getAdvisorId();
    this.getAppointments();
  }

  getAppointments() {
    this.appointmentService.getAll().subscribe(appointments => {
      appointments.filter(appointment => appointment.advisor_id === this.advisor_id).forEach(appointment => {
        this.appointments.push(appointment);
      });
      this.getClients();
    });
  }

  getClients(){
    this.appointments.forEach(appointment => {
      this.breederService.getOne(appointment.breeder_id).subscribe(breeder => {
        this.userService.getOne(breeder.user_id).subscribe(user => {
          let client = {
            id: breeder.id,
            appointment_id: appointment.id,
            fullname: user.fullname,
            appointment_status: appointment.status,
            location: user.location,
            cages: 0,
            description: user.description
          }
          this.clients.push(client);
        });

      });
    });
  }
}
