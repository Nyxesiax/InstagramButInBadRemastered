import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {PostsService} from "../../Service/postService/posts.service";
import {NgForOf, NgIf} from "@angular/common";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UsersService} from "../../Service/userService/users.service";

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

interface User {
  id?: number;
  email: string;
  username: string;
  password: string;
  bio?: string;
  score?: number;
  profilePicture?: ImageData;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatIcon,
    MatMiniFabButton,
    MatTooltip,
    MatFabButton,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})

export class UserProfileComponent {
  posts: Post[] = [];
  username: string | null;
  email: string | null;
  bio: string | null;
  score: number;
  id: number;
  errorMessage = "";
  selectedFile: File | null | undefined;
  pictureForm : FormGroup
  user: User | null = null;

  constructor(private router: Router, private postService: PostsService, private usersService: UsersService, private fb: FormBuilder) {
    this.username = sessionStorage.getItem("username");
    this.email = sessionStorage.getItem("email");
    this.bio = sessionStorage.getItem("bio");
    this.score = Number(sessionStorage.getItem("score"));
    this.id = Number(sessionStorage.getItem("id"));
    this.pictureForm = this.fb.group({
      userId: [this.id, Validators.required],
      image: [null],
    });
  }

  toEdit() {
    this.router.navigate(["/editProfile"])
  }

  onChange(event:any)
  {
    this.selectedFile = <File>event.target.files[0]
  }

  ngOnInit(): void {
    this.usersService.getUser(this.id).subscribe(user => {
      this.user = user;
    })
    this.postService.getPostsFromUser(<number>this.id).subscribe(posts => {
      this.posts = posts;
      for(let i = 0; i < posts.length; i++){
        this.score += posts[i].score;
      }
      sessionStorage.setItem("score", this.score.toString());
    }, error1 => {
      if (error1.status === 404) {
        this.errorMessage = "No posts found."
      }
    });
  }

  tryUploading() {
    const formData = new FormData();
    // @ts-ignore
    formData.append('userId', this.pictureForm.get('userId').value);
    if (this.selectedFile) {
      formData.append("image", this.selectedFile, this.selectedFile.name);
      console.log("Formdata", formData)
      console.log("Img data ", this.selectedFile);
      this.usersService.uploadProfilePicture(formData).subscribe(response => {
        console.log("Response from upload", response);

      })
    }
  }
}
