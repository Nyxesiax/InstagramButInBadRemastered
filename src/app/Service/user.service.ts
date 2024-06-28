import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8081';
  constructor(private http: HttpClient) { }

  getUserByID(id: number)
  {
    console.log("user service: " + id)
    const params = new HttpParams().set('id', id);
    return this.http.get<any>(`${this.apiUrl}/user`, {params});
  }


}
