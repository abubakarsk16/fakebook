import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log(route, state);
    if (this.authService.isAuthenticated()) {
      const isConfirm = window.confirm(
        "If you navigate to login page, you'll be log out form this session\nAre you sure you want to continue?"
      );
      if (isConfirm) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}
