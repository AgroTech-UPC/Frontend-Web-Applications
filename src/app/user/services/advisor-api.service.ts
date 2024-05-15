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
}
