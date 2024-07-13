import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {PostsService} from "../../Service/postService/posts.service";
import {NgForOf, NgIf} from "@angular/common";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UsersService} from "../../Service/userService/users.service";

interface Post {
  postId?: number;
  userId: number;
  caption: string
  title: string;
  body: string;
  image?: ImageData;
  score: number;
  data?: Date;
}

interface User {
  id?: number;
  email: string;
  username: string;
  password: string;
  bio?: string;
  score?: number;
  profilePicture?: ImageData;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatIcon,
    MatMiniFabButton,
    MatTooltip,
    MatFabButton,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})

export class UserProfileComponent {
  posts: Post[] = [];
  username: string | null;
  email: string | null;
  bio: string | null;
  score: number;
  id: number;
  errorMessage = "";
  user: User | null = null;

  constructor(private router: Router, private postService: PostsService, private usersService: UsersService, private fb: FormBuilder) {
    this.username = sessionStorage.getItem("username");
    this.email = sessionStorage.getItem("email");
    this.bio = sessionStorage.getItem("bio");
    this.id = Number(sessionStorage.getItem("id"));
    this.score = 0;
  }

  toEdit() {
    this.router.navigate(["/editProfile"])
  }

  ngOnInit(): void {
    this.usersService.getUser(this.id).subscribe(user => {
      this.user = user;
    })
    this.postService.getPostsFromUser(<number>this.id).subscribe(posts => {
      this.posts = posts;
      for(let i = 0; i < posts.length; i++){
        this.score += posts[i].score;
      }
      sessionStorage.setItem("score", this.score.toString());
    }, error1 => {
      if (error1.status === 404) {
        this.errorMessage = "No posts found."
      }
    });
  }
}
