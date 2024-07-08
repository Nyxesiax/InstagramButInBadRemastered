import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {UsersService} from "../../Service/userService/users.service";
import {NavbarComponent} from "../navbar/navbar.component";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLinkActive,
    RouterLink,
    NavbarComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage = '';
  username: string | undefined;

  private isAuthenticated = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usersService: UsersService,
    //private user: User
  ) {
    //this.createForm()
    this.loginForm = this.fb.nonNullable.group({
      email: ['hallo@test.de', Validators.required],
      password: ['Hallo12345', Validators.required]
    });
  }

  tryLogin(value: {email: string, password: string}) {
    this.usersService.authenticateUser(value.email, value.password).subscribe(response => {
      localStorage.setItem("id", JSON.stringify(response.id));
      localStorage.setItem("email", response.email);
      localStorage.setItem("username", response.username);
      localStorage.setItem("password", response.password);
      localStorage.setItem("bio", <string>response.bio);
      localStorage.setItem("score", JSON.stringify(response.score));

      this.router.navigate(["/dashboard"]);

    }, error => {
      this.errorMessage = 'Invalid email or password';
    });
  }
}
