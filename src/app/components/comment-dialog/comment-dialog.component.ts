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
  specifiedKey = "number";
  postId: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              protected commentService: CommentsService,
              protected userService: UsersService,
              protected postsService: PostsService,
              public commentDialog: MatDialog) {
    Object.keys(data).forEach(key => {
      if (key === this.specifiedKey) {
        this.postId = Number(data[key]);
      }
    });
    this.commentForm = this.fb.group({
      text: ['', Validators.required],
      user_id: sessionStorage.getItem("id"),
      post_id: this.postId
    });
  }

  ngOnInit(): void {
    this.commentService.getCommentsOnPost(this.postId).subscribe(comments =>{
      this.comments = comments;
      console.log("comments aus db ", comments);
      for(let comment of comments){
        this.userService.getUser(comment.user_id).subscribe(user =>{
          this.commentOwner[comment.user_id] = user.username
        });
      }
    });
  }

  tryCommenting(value: {post_id: number, user_id: number, text: string}): void {
    this.commentService.addItem(value).subscribe(response => {
      //rücken an der wand
      //hand an meinem schwanz
      //andere am ballermann
      //ganzer körper angespannt
      //rücken an der wand
      //gift in der hand
      //baba material digga tick das kristall
      this.successMessage = "Posted your comment";
    }, error => {
      this.errorMessage = "Couldn't post your comment";
    });
  }

}
