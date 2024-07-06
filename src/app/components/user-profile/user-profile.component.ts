import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {PostsService} from "../../Service/postService/posts.service";

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

  constructor(private router: Router, private postService: PostsService) {
    this.username = localStorage.getItem("username");
    this.email = localStorage.getItem("email");
    this.bio = localStorage.getItem("bio");
    this.score = localStorage.getItem("score");
  }

  toEdit() {
    this.router.navigate(["/editProfile"])
  }
}
