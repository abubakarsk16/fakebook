import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user.interface';
import { Observable } from 'rxjs';
import { LOCAL_STORAGE_TOKEN } from '../../localstorage.token';
import { SESSION_STORAGE_TOKEN } from '../../sessionstorage.token';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE_TOKEN) private localStorage: Storage,
    @Inject(SESSION_STORAGE_TOKEN) private sessionStorage: Storage
  ) {}
  fetchUsers(): Observable<any> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users', {
      observe: 'response',
    });
  }

  isAuthenticated(): boolean {
    if (
      this.localStorage.getItem('token') === null &&
      this.sessionStorage.getItem('token') === null
    ) {
      return false;
    } else {
      return true;
    }
  }
}
