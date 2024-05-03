import {Advisor} from "./advisor.model";
import {Appointment} from "./appointment.model";

export interface AdvisorHistory {
  advisor: Advisor;
  appointments: Appointment[];
}
