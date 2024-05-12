import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

//Import the BaseService
import {BaseService} from "../../shared/services/base.service";
import {Cage} from "../models/cage.model";
@Injectable({
  providedIn: 'root'
})
export class CageApiService extends BaseService<Cage>{
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.cageURL;
  }
}
