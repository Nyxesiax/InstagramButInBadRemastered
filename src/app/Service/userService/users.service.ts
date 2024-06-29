import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ERROR} from "@angular/compiler-cli/src/ngtsc/logging/src/console_logger";
import e from "express";

interface User {
  id?: number;
  email: string;
  username: string;
  password: string;
  bio?: string;
  score?: number;
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

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      catchError(this.handleError)
    );
  };

  updateItem(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteItem(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.status === 409) {
      errorMessage = 'The Username or E-Mail address already exists';
    } else if (error.status === 500) {
      errorMessage = 'Internal Server Error';
    }
    return throwError(() => new Error(errorMessage));
  }
}
