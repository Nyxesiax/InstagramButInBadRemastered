import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {PostsService} from "../../Service/postService/posts.service";
import {MatDialog} from "@angular/material/dialog";
import {CommentDialogComponent} from "../comment-dialog/comment-dialog.component";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {WebSocketService} from "../../Service/webSocketService/web-socket.service";
import {UsersService} from "../../Service/userService/users.service";

import { DomSanitizer } from '@angular/platform-browser';
import {AuthenticationService} from "../../Service/authenticationService/authentication.service";
import {MatTooltip} from "@angular/material/tooltip";

interface Post {
  postId: number;
  userId: number;
  caption: string
  title: string;
  body: string;
  image?: any;
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
  profilePicture?: any;
}

interface Postable
{
  postId: number;
  userId: number;
  username: string;
  caption: string
  title: string;
  body: string;
  image?: any;
  score: number;
  profilePicture?: any;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    NgForOf,
    NgIf,
    MatIcon,
    MatFabButton,
    MatTooltip
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit
{
  image: any;     //{ [key: number]: string } = {};
  dashboardForm: FormGroup;
  username: string | null;
  posts: any[];


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authservice: AuthenticationService,

    protected userService: UsersService,
    private webSocketService: WebSocketService,
    private postsService: PostsService,
    public commentDialog: MatDialog
  ) {
    this.posts = [];
    this.username = sessionStorage.getItem('username');
    this.dashboardForm = this.fb.nonNullable.group({
      id: [1, Validators.required]
    });
  }

  ngOnInit(): void
  {
    this.loadPosts()
    this.webSocketService.onEvent("updateProfile").subscribe(bio => {
      this.loadPosts()
    })

    this.webSocketService.onEvent('newPost').subscribe((post: Post) => {
      this.userService.getUser(post.userId).subscribe(user => {
        this.posts.unshift({
          postId: post.postId,
          userId: post.userId,
          body: post.body,
          caption: post.caption,
          image: post.image,
          profilePicture: user.profilePicture,
          score: post.score,
          title: post.title,
          username: user.username
        })
      });
    });
  }

  loadPosts()
  {
    this.postsService.getPosts().subscribe(posts =>
    {
      this.posts = posts;
      console.log("posts: ", posts)
    });
  }

  isLoggedIn() {
    return this.authservice.isLoggedIn();
  }

  upvote(post: Postable) {
    if (this.isLoggedIn()) {
      post.score += 1;
      this.postsService.updatePost(Number(post.postId), post).subscribe(response => {
      });
    } else {
      alert("Please login in order to vote.")
    }
  }

  downvote(post: Postable) {
    if (this.isLoggedIn()) {
    post.score -= 1;
    this.postsService.updatePost(Number(post.postId), post).subscribe(response => {
    });
    } else {
      alert("Please login in order to vote.")
    }
  }

  showCommentDialog(post: Postable){
    let test = this.commentDialog.open(CommentDialogComponent, {
      disableClose: true,
      data: {
        number: post.postId
      },
      exitAnimationDuration: '120ms',
      enterAnimationDuration: '300ms',
      height: '500px',
      width: '800px'
    });
    test.backdropClick().subscribe(b => {
      test.close();
    })
  }
}
