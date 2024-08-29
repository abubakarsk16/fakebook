import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE_TOKEN } from '../localstorage.token';
import { SESSION_STORAGE_TOKEN } from '../sessionstorage.token';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  previousUrl!: string | null;
  constructor(
    private router: Router,
    private alert: SnackbarService,
    @Inject(LOCAL_STORAGE_TOKEN) private localStorage: Storage,
    @Inject(SESSION_STORAGE_TOKEN) private sessionStorage: Storage
  ) {}

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
        this.alert.showMessage('Somthing happened wrong', 'error');
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
