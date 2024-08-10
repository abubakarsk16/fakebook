import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { User } from '../interfaces/user.interface';
import { LOCAL_STORAGE_TOKEN } from '../localstorage.token';
import { SESSION_STORAGE_TOKEN } from '../sessionstorage.token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  hide: boolean = true; //password toggle flag

  userMatched!: boolean;
  pswMatched!: boolean;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
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
    const enteredUsername = this.loginForm.value.username;
    const enteredPassword = this.loginForm.value.password;
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
      this.localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      this.sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }

  handleLogin() {
    this.loginService.fetchUsers().subscribe((response) => {
      const loggedInUser = this.matchCredentials(response);
      if (!this.userMatched) {
        this.loginForm.get('username')?.setErrors({ incorrect: true });
      } else if (!this.pswMatched) {
        this.loginForm.get('password')?.setErrors({ incorrect: true });
      } else {
        this.saveUser(loggedInUser);
      }
    });
  }
}
