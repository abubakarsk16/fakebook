import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { ConfirmService } from 'src/app/services/confirm.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'actions'];
  dataSource: User[] = [];
  loading: boolean = true;
  fetchSubs!: Subscription;
  resultSubs!: Subscription;
  deleteSubs!: Subscription;

  constructor(
    private userService: UserService,
    private alert: SnackbarService,
    private dialog: MatDialog,
    private confirmService: ConfirmService
  ) {}

  ngOnInit(): void {
    this.fetchSubs = this.userService.fetchUsers().subscribe({
      next: (res) => {
        this.loading = false;
        if (res.ok) {
          this.dataSource = res.body!;
        }
      },
      error: (err) => {
        this.loading = false;
        this.alert.showMessage('Error while fetching users!', 'error');
      },
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '100%',
      maxWidth: '450px',
    });
    this.resultSubs = dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.dataSource = [...this.dataSource, result];
        }
      },
      error: (err) => {
        this.alert.showMessage('Some error while updating UI', 'error');
      },
    });
  }
  openEditDialog(targetUser: User) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '100%',
      maxWidth: '450px',
      data: targetUser,
    });
    this.resultSubs = dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.dataSource = this.dataSource.map((user) =>
            user.id !== result.id ? user : result
          );
        }
      },
      error: (err) => {
        this.alert.showMessage('Some error while updating UI', 'error');
      },
    });
  }

  async deleteUser(userId: number) {
    const confirm = await this.confirmService.confirmAction(
      'Delete user',
      'Are you sure you want to delete this user?'
    );
    if (confirm) {
      this.deleteSubs = this.userService.removeUser(userId).subscribe({
        next: (res) => {
          if (res.ok) {
            this.dataSource = this.dataSource.filter(
              (user) => user.id !== userId
            );
            this.alert.showMessage('User deleted successfully!', 'success');
          }
        },
        error: (err) => {
          this.alert.showMessage('Error while deleting user', 'error');
        },
      });
    }
  }

  ngOnDestroy(): void {
    if (this.fetchSubs) {
      this.fetchSubs.unsubscribe();
    }
    if (this.resultSubs) {
      this.resultSubs.unsubscribe();
    }
  }
}
