import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthenticationService} from "../../Service/authentication.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {
    //this.createForm()
    this.loginForm = this.fb.nonNullable.group({
      email: ['hallo@test.de', Validators.required],
      password: ['Hallo12345', Validators.required]
    });
  }

  createForm() {
    this.loginForm = this.fb.nonNullable.group({
      email: ['hallo@test.de', Validators.required],
      password: ['Hallo12345', Validators.required]
    });
  }

  tryLogin(value: {email: string, password: string}) {
    // console.log("E-Mail: " + value.email);
    // console.log("Password: " + value.password);
    this.authService.doLogin(value).subscribe(response => {
      // console.log("TryLogin")
      // console.log(response)
      // alert("Welcome " + response[0].email)
      this.router.navigate(["/dashboard"]);
    }, error => {
      // console.log("Login failed " + error);
      }
      );
  }
}
