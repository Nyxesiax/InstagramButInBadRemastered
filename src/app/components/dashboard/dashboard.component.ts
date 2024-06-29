import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {PostsService} from "../../Service/postService/posts.service";

interface Post {
  postId?: number;
  userId: number;
  caption: string
  title: string;
  body: string;
  image: number;
  score: number;
  data?: Date;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit
{
  posts: Post[] = [];
  dashboardForm: FormGroup;
  username: string | null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private postsService: PostsService
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
      this.posts = posts
    });
  }
}
