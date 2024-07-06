import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UsersService} from "../../Service/userService/users.service";
import {response} from "express";

interface User {
  id?: number;
  email: string;
  username: string;
  password: string;
  bio?: string;
  score?: number;
}

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  username: string | null;
  email: string | null;
  bio: string | null;
  score: string | null;
  id: number;
  password: string | null;
  bioForm : FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private userService: UsersService) {
    this.username = localStorage.getItem("username");
    this.password = localStorage.getItem("password");
    this.email = localStorage.getItem("email");
    this.bio = localStorage.getItem("bio");
    this.score = localStorage.getItem("score");
    this.id = Number(localStorage.getItem("id"));
    this.bioForm = this.fb.group({
      bio: ['', Validators.required]
    });
  }

  save(value: {bio: string}) {
    console.log("Bio: " + value.bio);
    this.userService.updateUser(this.id, {email: <string>this.email, password: <string>this.password, username: <string>this.username, bio: value.bio})
      .subscribe(response => {
      alert("Profile updated successfully");
      localStorage.setItem("bio", value.bio);
      this.router.navigate(["/userProfile"])
    })
  }
}
