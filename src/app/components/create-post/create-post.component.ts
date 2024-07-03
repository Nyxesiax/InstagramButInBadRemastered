import { Component } from '@angular/core';
import {UsersService} from "../../Service/userService/users.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PostsService} from "../../Service/postService/posts.service";

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

  createPostForm: FormGroup;
  errorMessage: string | null=null;
  successMessage = '';

  constructor(
    private postsService: PostsService,
    private router: Router,
    private fb: FormBuilder) {
    this.createPostForm = this.fb.group({
      userId: localStorage.getItem("id"),
      title: ['', Validators.required],
      body: ['', Validators.required],
      image: ImageData,
      caption: ['', Validators.maxLength(160)],
      score: 0

    });

  }

  tryUploading(value: {userId: number, title: string, body: string, caption: string, score: number}) {
    this.postsService.addPost(value).subscribe(response => {
      alert("Posted!")
      this.router.navigate(["/dashboard"]);
    }, error => {
      this.errorMessage = "Couldn't post.";
    });
    // alert("upload btn works")
  }

}
