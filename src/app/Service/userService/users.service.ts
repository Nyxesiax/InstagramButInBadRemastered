import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Comment {
  id?: number;
  email: string;
  username: string;
  password: string;
  post_id: string;
  bio: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }
}
