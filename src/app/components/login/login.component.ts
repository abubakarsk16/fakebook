import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { LOCAL_STORAGE_TOKEN } from '../../localstorage.token';
import { SESSION_STORAGE_TOKEN } from '../../sessionstorage.token';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;

  pswHide: boolean = true; //password toggle flag

  isLoading: boolean = false;

  userMatched!: boolean;
  pswMatched!: boolean; //flags for auth

  subscription!: Subscription;

  constructor(
    private UserService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private alert: SnackbarService,
    @Inject(LOCAL_STORAGE_TOKEN) private localStorage: Storage,
    @Inject(SESSION_STORAGE_TOKEN) private sessionStorage: Storage
  ) {
    this.loginForm = this.fb.group({
      username: ['Bret', Validators.required],
      password: ['Bret', Validators.required],
      savePassword: [true],
    });
  }

  ngOnInit(): void {}

  private matchCredentials(fetchedUsers: User[]): User | null {
    //match credentials and set flags
    this.userMatched = false;
    this.pswMatched = false;
    const enteredUsername = this.loginForm.value.username.trim(' ');
    const enteredPassword = this.loginForm.value.password.trim(' ');
    for (const user of fetchedUsers) {
      if (enteredUsername === user.username || enteredUsername === user.email) {
        this.userMatched = true;
        if (enteredPassword === user.username) {
          this.pswMatched = true;
          return user;
        } else {
          this.pswMatched = false;
          return null;
        }
      }
    }
    return null;
  }

  private saveUser(currentUser: User | null) {
    //save user conditionaly on the value of check box
    if (this.loginForm.value.savePassword) {
      this.localStorage.setItem('token', JSON.stringify(currentUser));
    } else {
      this.sessionStorage.setItem('token', JSON.stringify(currentUser));
    }
    this.router.navigate(['/']);
  }

  handleLogin() {
    this.isLoading = true;
    this.subscription = this.UserService.fetchUsers().subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.ok) {
          const loggedInUser = this.matchCredentials(response.body!);
          if (!this.userMatched) {
            this.loginForm.get('username')?.setErrors({ incorrect: true });
          } else if (!this.pswMatched) {
            this.loginForm.get('password')?.setErrors({ incorrect: true });
          } else {
            this.saveUser(loggedInUser);
          }
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.alert.showMessage('Some error occurred during login!', 'error');
      },
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
