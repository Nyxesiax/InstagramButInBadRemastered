import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Comment {
  idcomment?: number;
  text: string;
  date?: Date;
  user_id: number;
  post_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor() { }
}
