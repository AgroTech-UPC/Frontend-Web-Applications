import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Publication } from "../models/publication.model";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationsApiService {
  baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient) { }


  getPublications() {
    return this.http.get<Publication[]>(`${this.baseUrl}/publications`);
  }

  getPublication(id: any) {
    return this.http.get<Publication>(`${this.baseUrl}/publications/${id}`);
  }
  
  createPublication(publication: Publication) : Observable<Publication> {
    const url = `${this.baseUrl}/publications`;
    return this.http.post<Publication>(url, publication);
  }

}
