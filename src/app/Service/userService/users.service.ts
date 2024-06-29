import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

interface User {
  id?: number;
  email: string;
  username: string;
  password: string;
  bio: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:8081/users';
  private apiUrlNormal = 'http://localhost:8081';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  authenticateUser(name: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/authenticate`, { name, password });
  }

  addItem(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateItem(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteItem(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  doRegister(value: { email: string; username: string, password: string; }) : Observable<any> {
    console.log("EMail: " + value.email);
    console.log("Username: " + value.username);
    console.log("Password: " + value.password);
    return this.http.post(`${this.apiUrlNormal}/registerWindow`, value);
  }

  doLogin(value: { email: string; password: string; }) {
    console.log("EMail: " + value.email);
    console.log("Password: " + value.password);
    return this.http.post<any>(`${this.apiUrlNormal}/loginWindow`, value);
  }
}
