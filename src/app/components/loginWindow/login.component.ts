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
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usersService: UsersService,
    private navbarComp: NavbarComponent
  ) {
    this.loginForm = this.fb.nonNullable.group({
      email: ['hallo@test.de', Validators.required],
      password: ['Hallo12345', Validators.required]
    });
  }

  tryLogin(value: {email: string, password: string}) {
    this.usersService.authenticateUser(value.email, value.password).subscribe(response => {
      sessionStorage.setItem("id", JSON.stringify(response.id));
      sessionStorage.setItem("email", response.email);
      sessionStorage.setItem("username", response.username);
      sessionStorage.setItem("password", response.password);
      sessionStorage.setItem("bio", <string>response.bio);
      sessionStorage.setItem("score", JSON.stringify(response.score));
      this.navbarComp.loggedIn = true;
      this.router.navigate(["/dashboard"]);
    }, error => {
      this.errorMessage = 'Invalid email or password';
    });
  }
}
