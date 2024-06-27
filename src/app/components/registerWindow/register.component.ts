import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthenticationService} from "../../Service/authentication.service";
import {ERROR} from "@angular/compiler-cli/src/ngtsc/logging/src/console_logger";

@Component({
  selector: 'app-registerWindow',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [AuthenticationService]
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
      email: ['hallo@test.de', Validators.required],
      username: ['Hallo', Validators.required],
      password: ['Hallo12345', Validators.required]
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
    console.log("value:" + value)
    this.authenticationService.doRegister(value).subscribe(response => {
      alert("Response: " + JSON.stringify(response))
      if ("") {
        this.router.navigate(["/dashboard"]);
      }
    });
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
