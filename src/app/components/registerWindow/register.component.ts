import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {UsersService} from "../../Service/userService/users.service";

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
  providers: [UsersService]
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
    private userService: UsersService,
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
    this.userService.doRegister(value).subscribe(response => {
      console.log("In TryRegister");
      if (response === "0") {
        alert("The Username or E-Mail address already exists");
      }
      if (response === "1") {
        alert("Your account has been created")
        this.router.navigate(["/loginWindow"]);
      }
    });
  }

  ngOnInit() {
  }

}
