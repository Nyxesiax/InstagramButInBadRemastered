import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthenticationService} from "../../Service/authentication.service";

@Component({
  selector: 'app-registerWindow',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  @Component({
    selector: 'app-start-screen',
    templateUrl: './start-screen.component.html',
    styleUrls: ['./start-screen.component.css']
  })

  registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder) {
    //this.createForm();
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required ],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryRegister(value: {email: string, username: string, password: string}) {
    alert("E-Mail: " + value.email);
    alert("Username: " + value.username);
    alert("Password: " + value.password);
    this.router.navigate(["/dashboard"]);
    /*this.authenticationService.doRegister(value)
      .then(res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Your account has been created';
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });

     */
  }

  ngOnInit() {
  }

}
