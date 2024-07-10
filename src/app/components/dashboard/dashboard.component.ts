import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {PostsService} from "../../Service/postService/posts.service";
import {UsersService} from "../../Service/userService/users.service";
import {NgForOf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {CommentDialogComponent} from "../comment-dialog/comment-dialog.component";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton} from "@angular/material/button";

interface Post {
  postId: number;
  userId: number;
  caption: string
  title: string;
  body: string;
  fileId?: number;
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
    MatIcon,
    MatFabButton
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit
{
  posts: Post[] = [];
  owner: { [key: number]: string } = {};
  dashboardForm: FormGroup;
  username: string | null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    protected userService: UsersService,
    private postsService: PostsService,
    public commentDialog: MatDialog
  ) {
    this.username = localStorage.getItem('username');
    this.dashboardForm = this.fb.nonNullable.group({
      id: [1, Validators.required]
    });
  }

  ngOnInit(): void
  {
    this.postsService.getPosts().subscribe(posts =>
    {
      this.posts = posts;
      console.log(JSON.stringify(this.posts))
      for(let i = 0; i < posts.length; i++){
        this.owner[i] = posts[i].username;
        console.log(this.owner[i])
      }
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
