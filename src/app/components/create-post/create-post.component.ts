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
    //this.createForm();
    this.createPostForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      image: [],
      caption: ['', Validators.maxLength(160)]

    });
  }

  tryUploading(value: {title: string, body: string, caption: string}) {
    // this.postsService.addPost(value).subscribe(response => {
    //   alert("Posted!")
    //   this.router.navigate(["/loginWindow"]);
    // }, error => {
    //   this.errorMessage = "The Username or E-Mail address already exists";
    // });
    alert("upload btn works")
  }

}
