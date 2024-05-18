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
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.userURL;
  }

  setLogged(isLogged: boolean){
    // Check if the window object is defined (prevent error from server side rendering)
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('isLogged', String(isLogged));
    }
  }

  isLogged() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const logged = localStorage.getItem('isLogged');
      return logged === 'true';
    }
    return false;
  }

  setIsBreeder(isBreeder: boolean) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('isBreeder', String(isBreeder));
    }
  }

  getIsBreeder(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const isBreeder = localStorage.getItem('isBreeder');
      return isBreeder === 'true';
    }
    return false;
  }
}
