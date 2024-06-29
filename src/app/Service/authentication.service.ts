import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://localhost:8081';
  constructor(private http: HttpClient) { }

  doLogin(value: { email: string; password: string; }) {
    console.log('value email: ' + value.email);
    console.log('value pass: ' + value.password);
    console.log("Value: " + value);
   // const params = new HttpParams().set('email', value.email).set('password', value.password);
    return this.http.post<any>(`${this.apiUrl}/loginWindow`, value);
  }

  doRegister(value: { email: string; username: string, password: string; }) : Observable<any> {
    console.log('email: ' + value.email);
    console.log("username: " + value.username);
    console.log('pass: ' + value.password);
    return this.http.post(`${this.apiUrl}/registerWindow`, value);
  }

  isLoggedIn(): boolean {
    return false;
  }
}
