import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  username: string | null;
  email: string | null;
  bio: string | null;
  score: string | null;

  constructor() {
    this.username = localStorage.getItem("username");
    this.email = localStorage.getItem("email");
    this.bio = localStorage.getItem("bio");
    this.score = localStorage.getItem("score");
  }
}
