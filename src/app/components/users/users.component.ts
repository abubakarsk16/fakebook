import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  users!: User[];
  loadingUsers: boolean = true;
  fetchUsersSubs!: Subscription;
  displayedColumns = ['id', 'name', 'username', 'email', 'actions'];

  constructor(
    private userService: UserService,
    private alert: SnackbarService
  ) {}

  ngOnInit(): void {
    this.fetchUsersSubs = this.userService.fetchUsers().subscribe({
      next: (res) => {
        this.loadingUsers = false;
        if (res.ok) {
          this.users = res.body!;
        }
      },
      error: (err) => {
        this.loadingUsers = false;
        this.alert.showMessage('Error while fetching users', 'error');
      },
    });
  }

  ngOnDestroy(): void {
    if (this.fetchUsersSubs) {
      this.fetchUsersSubs.unsubscribe();
    }
  }
}
