import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

interface User {
  id?: number;
  email: string;
  username: string;
  password: string;
  bio?: string;
  score?: number;
  profilePicture?: any;
}

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private apiUrl = 'http://localhost:8081/users';
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

  // updateUser(id: number, user: User): Observable<User> {
  //   return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  // }

  deleteUser(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  updateUser(form: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${form.get("userId")}`, form);
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
