import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users', {
      observe: 'response',
    });
  }

  createUser(newUser: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(
      'https://jsonplaceholder.typicode.com/users',
      newUser,
      { observe: 'response' }
    );
  }

  updateUser(updatedUser: User): Observable<HttpResponse<User>> {
    return this.http.put<User>(
      `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
      updatedUser,
      { observe: 'response' }
    );
  }

  removeUser(userId: number): Observable<HttpResponse<object>> {
    return this.http.delete<User>(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
      { observe: 'response' }
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
  }
}
