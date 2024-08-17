import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LOCAL_STORAGE_TOKEN } from '../localstorage.token';
import { SESSION_STORAGE_TOKEN } from '../sessionstorage.token';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
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

  getAuthUser() {
    const token: string | null =
      localStorage.getItem('token') || sessionStorage.getItem('token');

    if (token) {
      try {
        return JSON.parse(token);
      } catch (e) {
        console.error('Error parsing token:', e);
        return null;
      }
    }

    return null;
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
