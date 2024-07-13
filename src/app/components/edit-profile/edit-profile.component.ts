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
  selectedFile: File | null | undefined;

  constructor(private router: Router, private fb: FormBuilder, private userService: UsersService) {
    this.username = sessionStorage.getItem("username");
    this.password = sessionStorage.getItem("password");
    this.email = sessionStorage.getItem("email");
    this.bio = sessionStorage.getItem("bio");
    this.score = sessionStorage.getItem("score");
    this.id = Number(sessionStorage.getItem("id"));
    this.bioForm = this.fb.group({
      bio: ['', Validators.required],
      userId: [this.id, Validators.required],
      image: [null],
    });
  }

  onChange(event:any)
  {
    this.selectedFile = <File>event.target.files[0]
  }

  save(value: {bio: string}) {
    this.userService.updateUser(this.id, {email: <string>this.email, password: <string>this.password, username: <string>this.username, bio: value.bio})
      .subscribe(response => {
      alert("Profile updated successfully");
        sessionStorage.setItem("bio", value.bio);
    });
    const formData = new FormData();
    // @ts-ignore
    formData.append('userId', this.bioForm.get('userId').value);
    if (this.selectedFile) {
      formData.append("image", this.selectedFile, this.selectedFile.name);
      this.userService.uploadProfilePicture(formData).subscribe(response => {
        console.log("Response from upload", response);
      })
    }
    this.router.navigate(["/userProfile"])
  }
}
