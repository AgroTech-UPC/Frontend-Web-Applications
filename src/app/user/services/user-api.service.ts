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

<<<<<<< HEAD
  isBreeder: boolean = true;

  constructor(private http:HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side errors or network issues.
      console.log(
        `An error occurred ${error.status}, body was: ${error.error}`
      );
    } else {
      // Errors returned by the backend.
      console.log(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Return an Observable that emits an error message.
    return throwError(
      'Something happened with request, please try again later.'
    );
  }

  //Get all users
  getList(): Observable<User> {
    return this.http
      .get<User>(this.baseUrl + this.extraUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Get user by index
  getUser(index:any){
    return this.http.get<User>(this.baseUrl + this.extraUrl + index)
=======
  isBreeder: boolean = false;
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.userURL;
>>>>>>> feature/publication-view
  }

  setIsBreeder(isBreeder: boolean) {
    this.isBreeder = isBreeder;
  }

  getIsBreeder(): boolean {
    return this.isBreeder;
  }
}
