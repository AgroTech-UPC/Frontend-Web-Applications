import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

//Import the user model
import {User} from "../models/user.model";
import {BaseService} from "../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends  BaseService<User>{

  isBreeder: boolean = false;
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.userURL;
  }

  setIsBreeder(isBreeder: boolean) {
    this.isBreeder = isBreeder;
  }

  getIsBreeder(): boolean {
    return this.isBreeder;
  }
}
