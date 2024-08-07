import {Component, ElementRef, Inject, Renderer2, ViewChild} from '@angular/core';
import {PostsService} from "../../Service/postService/posts.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UsersService} from "../../Service/userService/users.service";
import {CommentsService} from "../../Service/commentsService/comments.service";
import {AuthenticationService} from "../../Service/authenticationService/authentication.service";
import {WebSocketService} from "../../Service/webSocketService/web-socket.service";

interface Comment{
  idcomments: number;
  text: string;
  date?: Date;
  user_id: number;
  post_id: number;
}

interface User {
  id?: number;
  email: string;
  username: string;
  password: string;
  bio?: string;
  score?: number;
}

interface Post {
  postId?: number;
  userId: number;
  caption: string
  title: string;
  body: string;
  fileId?: number;
  score: number;
  data?: Date;
}

@Component({
  selector: 'app-comment-dialog',
  standalone: true,
  imports: [
    NgForOf,
    MatIcon,
    MatFabButton,
    ReactiveFormsModule,
    MatMiniFabButton,
    NgIf
  ],
  templateUrl: './comment-dialog.component.html',
  styleUrl: './comment-dialog.component.css'
})
export class CommentDialogComponent {

  commentForm: FormGroup;
  comments: any[] = [];
  errorMessage: string | null=null;
  successMessage = '';
  specifiedKey = "number";
  postId: number = 0;
  //commentowner: Map<number, string>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              protected commentService: CommentsService,
              private authervice: AuthenticationService,
              private webSocketService: WebSocketService,
              protected userService: UsersService,
              protected postsService: PostsService,
              public commentDialog: MatDialog,
              private renderer: Renderer2) {
    Object.keys(data).forEach(key => {
      if (key === this.specifiedKey) {
        this.postId = Number(data[key]);
      }
    });
    //this.commentowner = new Map<number, string>
    this.commentForm = this.fb.group({
      text: ['', Validators.required],
      user_id: sessionStorage.getItem("id"),
      post_id: this.postId
    });
  }

  ngOnInit(): void {
    this.loadComments()
    this.webSocketService.onEvent('newComment').subscribe((comment: Comment) => {
      this.userService.getUser(comment.user_id).subscribe(user => {
        this.comments.unshift({
          text: comment.text,
          username: user.username,
          profilePicture: user.profilePicture,
        })
      })
    })
  }


  loadComments()
  {
    this.commentService.getCommentsOnPost(this.postId).subscribe(comments =>{
      this.comments = comments;
    });
  }



  isLoggedIn() {
    return this.authervice.isLoggedIn();
  }

  tryCommenting(value: {post_id: number, user_id: number, text: string}): void {
    if (this.isLoggedIn()) {
      this.commentService.addComment(value).subscribe(response => {

        this.successMessage = "Posted your comment."
        // @ts-ignore
        this.commentForm.get("text").setValue("")
      }, error => {
        this.errorMessage = "Couldn't post your comment";
      });
    } else {
      this.errorMessage = "Please login in order to comment."
    }
  }

}
