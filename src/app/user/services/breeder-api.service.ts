import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

//Import the breeder model
import {Breeder} from "../models/breeder.model";
import {BaseService} from "../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class BreederApiService extends  BaseService<Breeder>{
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.breederURL;
  }
}
