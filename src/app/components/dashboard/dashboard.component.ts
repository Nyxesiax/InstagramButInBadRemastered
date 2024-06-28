import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {UserService} from "../../Service/user.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent
{

  dashboardForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.dashboardForm = this.fb.nonNullable.group({
      id: [1, Validators.required]
    });
  }

  getUser(value: {id: number})
  {
    console.log("dashboard id: " + value)
    this.userService.getUserByID(value).subscribe(res => {
      alert("did that" + JSON.stringify(res))
    }, err => {
      alert("shit not right" + err)
    })
  }
}
