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
    MatFabButton
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit
{
  posts: any[] = [];
  image: any;
  owner: Map<number, string>;     //{ [key: number]: string } = {};
  dashboardForm: FormGroup;
  username: string | null;


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private webSocketService: WebSocketService,
    private postsService: PostsService,
    private userService: UsersService,
    public commentDialog: MatDialog
  ) {
    this.owner = new Map<number, string>
    this.username = sessionStorage.getItem('username');
    this.dashboardForm = this.fb.nonNullable.group({
      id: [1, Validators.required]
    });
  }

  ngOnInit(): void
  {
    this.loadPosts()
    this.webSocketService.onEvent('newPost').subscribe((post: Post) => {
      this.posts.unshift(post);
      this.userService.getUser(post.userId ).subscribe(user => {
        if (post.postId != null) {
          this.owner.set(post.postId, user.username);
        }
      });
    });


  }

  loadPosts()
  {
    this.postsService.getPosts().subscribe(posts =>
    {
      this.posts = posts;
      for(let post of posts)
      {
        this.userService.getUser(post.userId ).subscribe(user => {
          if (post.postId != null) {
            this.owner.set(post.postId, user.username);
          }
        });
      }
    });
  }

  upvote(post: Post) {
    post.score += 1;
    this.postsService.updatePost(Number(post.postId), post).subscribe(response => {
    });
  }

  downvote(post: Post) {
    post.score -= 1;
    this.postsService.updatePost(Number(post.postId), post).subscribe(response => {
    });
  }

  showCommentDialog(post: Post){
    this.commentDialog.open(CommentDialogComponent, {
      data: {
        number: post.postId
      },
      height: '500px',
      width: '800px'
    });
  }
}
