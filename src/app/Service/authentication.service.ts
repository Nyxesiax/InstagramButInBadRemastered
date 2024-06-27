import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://localhost:8081';
  constructor(private http: HttpClient) { }

  doLogin(value: { email: string; password: string; }) {
    console.log('value email: ' + value.email);
    console.log('value pass: ' + value.password);
    return new Promise<any>((resolve, reject) => {

     /* firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          console.log('You are: ' + JSON.stringify(res));
          this.userbla.email = res.user.email;
          resolve(res);
        }, err => reject(err)), localStorage.clear();

      */
    });
  }

  doRegister(value: { email: string; username: string, password: string; }) : Observable<any> {
    console.log('email: ' + value.email);
    console.log("username: " + value.username);
    console.log('pass: ' + value.password);
    return this.http.post(`${this.apiUrl}/registerWindow`, value);
  }

  isAuthenticated(): boolean {
    return false;
  }
}
