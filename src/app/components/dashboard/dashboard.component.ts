import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {PostsService} from "../../Service/postService/posts.service";
import {UsersService} from "../../Service/userService/users.service";
import {MatDialog} from "@angular/material/dialog";
import {CommentDialogComponent} from "../comment-dialog/comment-dialog.component";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import { DomSanitizer } from '@angular/platform-browser';

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
  posts: Post[] = [];
  image: any;
  owner: Map<number, string>;     //{ [key: number]: string } = {};
  dashboardForm: FormGroup;
  username: string | null;


  constructor(
    private router: Router,
    private fb: FormBuilder,

    private sanitizer: DomSanitizer,

    protected userService: UsersService,
    private postsService: PostsService,
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
    this.postsService.getPosts().subscribe(posts =>
    {
      this.posts = posts;
      for(let i = 0; i < posts.length; i++){
        this.owner.set(posts[i].postId, posts[i].username);
      }
      /*
      console.log("posts")
      console.log(this.posts)
      console.log("owner")
      console.log(this.owner)

       */
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
