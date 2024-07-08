import { Component } from '@angular/core';
import {PostsService} from "../../Service/postService/posts.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-comment-dialog',
  standalone: true,
  imports: [],
  templateUrl: './comment-dialog.component.html',
  styleUrl: './comment-dialog.component.css'
})
export class CommentDialogComponent {

  constructor(private postsService: PostsService,
              public commentDialog: MatDialog) {
  }

}
