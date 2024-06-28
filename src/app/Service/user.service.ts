import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8081';
  constructor(private http: HttpClient) { }

  getUserByID(value: {id: number})
  {
    console.log("user service: " + value.id)
    const params = new HttpParams().set('id', value.id);
    return this.http.get<any>(`${this.apiUrl}/user`, {params});
  }


}
