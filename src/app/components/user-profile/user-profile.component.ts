import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {PostsService} from "../../Service/postService/posts.service";
import {NgForOf} from "@angular/common";
import {error} from "@angular/compiler-cli/src/transformers/util";

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

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})

export class UserProfileComponent {
  posts: Post[] = [];
  username: string | null;
  email: string | null;
  bio: string | null;
  score: string | null;
  id: number | null;
  errorMessage: string | undefined;

  constructor(private router: Router, private postService: PostsService) {
    this.username = localStorage.getItem("username");
    this.email = localStorage.getItem("email");
    this.bio = localStorage.getItem("bio");
    this.score = localStorage.getItem("score");
    this.id = Number(localStorage.getItem("id"));
  }

  toEdit() {
    this.router.navigate(["/editProfile"])
  }

  ngOnInit(): void {
    this.postService.getPostsFromUser(<number>this.id).subscribe(posts => {
      this.posts = posts;
      /*for(let post of posts)
      {
        this.userService.getUser(post.userId).subscribe(user =>
        {
          this.owner[post.userId] = user.username
        });
      }
       */

    }, error1 => {
      if (error1.status === 404) {
        this.errorMessage = "No posts found."
      }
    });
  }
}
