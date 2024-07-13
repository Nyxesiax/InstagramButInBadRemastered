import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

interface Post {
  postId: number;
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
export class WebSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:8081');
  }

  onEvent(event: string): Observable<Post> {
    return new Observable((observer) => {
      this.socket.on(event, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }
}
