import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

//Import the breeder model
import {Advisor} from "../models/advisor.model";
import {BaseService} from "../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})

export class AdvisorApiService extends  BaseService<Advisor>{
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.advisorURL;
  }

  setAdvisorId(advisor_id: number) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('advisor_id', advisor_id.toString());
    }
  }

  getAdvisorId(): number {
    if (typeof window !== 'undefined' && window.localStorage) {
      const advisor_id = localStorage.getItem('advisor_id');
      return advisor_id ? parseInt(advisor_id) : 0;
    }
    return 0;
  }
}
