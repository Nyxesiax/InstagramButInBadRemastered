import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

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

  doRegister(value: { email: string; password: string; }) {
    console.log('email: ' + value.email);
    console.log('pass: ' + value.password);
    return new Promise<any>((resolve, reject) => {
/*
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          return this.db.collection('users').doc(res.user.uid).set({
            email: value.email
          }).then(() => {
            resolve(res);
          });
        }, err => reject(err));

 */
    });

  }

  isAuthenticated(): boolean {
    return false;
  }
}
