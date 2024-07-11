import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {UsersService} from "../../Service/userService/users.service";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-registerWindow',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    NavbarComponent
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
  errorMessage: string | null=null;
  successMessage = '';

  constructor(
    private userService: UsersService,
    private router: Router,
    private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['hallo@test.de', Validators.required],
      username: ['Hallo', Validators.required],
      password: ['Hallo12345', Validators.required]
    });
  }

  tryRegister(value: {email: string, username: string, password: string}) {
    this.userService.addUser(value).subscribe(response => {
        alert("Your account has been created")
        this.router.navigate(["/loginWindow"]);
    }, error => {
        this.errorMessage = "The Username or E-Mail address already exists";
    });
  }

  ngOnInit() {
  }

}
