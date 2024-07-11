import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedIn: boolean = false;

  constructor() {}

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login() {
    // Simulate login logic, in a real application, you would handle authentication here
    this.loggedIn = true;
  }

  logout(): void {
    this.loggedIn = false;
  }

}
