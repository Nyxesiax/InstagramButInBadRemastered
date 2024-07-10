import {Component, Inject} from '@angular/core';
import {PostsService} from "../../Service/postService/posts.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {NgForOf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UsersService} from "../../Service/userService/users.service";
import {CommentsService} from "../../Service/commentsService/comments.service";

interface Comment{
  idcomment?: number;
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
    MatMiniFabButton
  ],
  templateUrl: './comment-dialog.component.html',
  styleUrl: './comment-dialog.component.css'
})
export class CommentDialogComponent {

  commentForm: FormGroup;
  comments: Comment[] = [];
  errorMessage: string | null=null;
  successMessage = '';
  commentOwner: { [key: number]: string } = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: Post,
              private fb: FormBuilder,
              protected commentService: CommentsService,
              protected userService: UsersService,
              protected postsService: PostsService,
              public commentDialog: MatDialog) {
    this.commentForm = this.fb.group({
      text: ['', Validators.required],
      user_id: localStorage.getItem("id"),
      post_id: this.data.postId
    });
  }

  ngOnInit(): void {
    this.commentService.getCommentsOnPost(this.data.postId).subscribe(comments =>{
      this.comments = comments;

      // for(let comment of comments){
      //   this.userService.getUser(comment.user_id).subscribe(user =>{
      //     this.commentOwner[comment.userId] = user.username
      //   });
      // } TODO: sobald der rest funktioniert das hier auch machen
    });
  }

  tryCommenting(value: {idcomment?: number, text: string, date?: Date, user_id: number, post_id: number}): void {
    console.log("postid aus data: " + this.data.postId);
    this.commentService.addItem(value).subscribe(response => {
      alert("Posted your comment!")
      this.commentDialog.closeAll();
    }, error => {
      this.errorMessage = "Couldn't post your comment.";
    });
  }

}
