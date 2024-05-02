import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

import {Breeder} from "../../models/breeder.model";

@Injectable({
  providedIn: 'root'
})
export class BreederApiService {
  baseUrl: string = environment.baseURL;
  constructor(private http: HttpClient) { }

  getBreeders(){
    return this.http.get<Breeder[]>(`${this.baseUrl}/breeders`);
  }
  getBreeder(id: any){
    return this.http.get<Breeder>(`${this.baseUrl}/breeders/${id}`);
  }

}
