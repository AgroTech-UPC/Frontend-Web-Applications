import {Advisor} from "./advisor.model";

export interface AvailableDate {
  "id": number;
  "day": any;
  "start_time": any;
  "end_time": any;
  "advisor_id": number;
  "status": any;

  "advisor": Advisor;
}
