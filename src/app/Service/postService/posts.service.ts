import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'http://localhost:8081/posts';
  constructor() { }
}
