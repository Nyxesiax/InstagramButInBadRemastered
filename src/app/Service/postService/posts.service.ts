import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Post {
  postId?: number;
  userId: number;
  caption: string
  title: string;
  body: string;
  image?: any;
  score: number;
  data?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService
{
  private apiUrl = 'http://localhost:8081/posts';
  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getPostsFromUser(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/userId/${id}`);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  createPost(post: FormData): Observable<any> {
    return this.http.post(this.apiUrl, post);
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, post);
  }

  deletePost(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
