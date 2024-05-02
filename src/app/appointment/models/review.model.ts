import {Appointment} from "./appointment.model";

export interface Review {
  "id": number;
  "appointment_id": number;
  "comment": any;
  "rating": number;

  "appointment": Appointment;
}
