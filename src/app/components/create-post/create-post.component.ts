import {Component, OnInit} from '@angular/core';
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
export class CreatePostComponent{

  createPostForm: FormGroup;
  selectedFile: File | null | undefined;
  errorMessage: string | null=null;
  successMessage = '';

  constructor(
    private postsService: PostsService,
    private router: Router,

    private fb: FormBuilder) {
    this.createPostForm = this.fb.group({
      userId: [sessionStorage.getItem("id"), Validators.required],
      caption: ['', Validators.required],
      title: ['', Validators.required],
      body: ['', Validators.required],
      image: [null],
      score: [0, Validators.required]
    });
  }

  onChange(event:any)
  {
    this.selectedFile = <File>event.target.files[0]
  }

  tryUploading() {
    const formData = new FormData();
    // @ts-ignore
    formData.append('userId', this.createPostForm.get('userId').value);
    // @ts-ignore
    formData.append('caption', this.createPostForm.get('caption').value);
    // @ts-ignore
    formData.append('title', this.createPostForm.get('title').value);
    // @ts-ignore
    formData.append('body', this.createPostForm.get('body').value);
    // @ts-ignore
    formData.append('score', this.createPostForm.get('score').value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.postsService.createPost(formData).subscribe(response => {
      alert("Posted!")
      this.router.navigate(["/dashboard"]);
    }, error => {
      this.errorMessage = "Couldn't post.";
    });
  }
}
