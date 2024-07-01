import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {PostsService} from "../../Service/postService/posts.service";
import {UsersService} from "../../Service/userService/users.service";
import {NgForOf} from "@angular/common";
import { DomSanitizer } from '@angular/platform-browser';

interface Post {
  postId?: number;
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
    NgForOf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit
{
  posts: Post[] = [];
  image: any;
  owner: { [key: number]: string } = {};
  dashboardForm: FormGroup;
  username: string | null;


  constructor(
    private router: Router,
    private fb: FormBuilder,

    private sanitizer: DomSanitizer,

    protected userService: UsersService,
    private postsService: PostsService
  ) {
    this.username = localStorage.getItem('username');
    this.dashboardForm = this.fb.nonNullable.group({
      id: [1, Validators.required]
    });
  }


  ngOnInit(): void
  {
    this.image = "./assets/img/rattig.jpg";
    this.postsService.getPosts().subscribe(posts =>
    {
      this.posts = posts;
      for(let post of posts)
      {
        this.userService.getUser(post.userId).subscribe(user =>
        {
          this.owner[post.userId] = user.username
        });
      }

    });


  }
}
