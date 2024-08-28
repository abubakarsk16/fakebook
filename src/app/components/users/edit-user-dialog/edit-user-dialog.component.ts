import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss'],
})
export class EditUserDialogComponent implements OnInit {
  editUserForm!: FormGroup;
  subscription!: Subscription;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private alert: SnackbarService,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: User
  ) {}

  ngOnInit(): void {
    this.editUserForm = this.fb.group({
      id: [this.data.id],
      name: [this.data.name],
      username: [this.data.username],
      email: [this.data.email],
    });
  }
  isSubmitDisable() {
    const name = this.editUserForm.value.name;
    const username = this.editUserForm.value.username;
    const email = this.editUserForm.value.email;
    return (
      name.trim() === '' ||
      username.trim() === '' ||
      email.trim() === '' ||
      (name.trim() === this.data.name &&
        username.trim() === this.data.username &&
        email.trim() === this.data.email)
    );
  }

  editUser(form: FormGroup) {
    this.subscription = this.userService.updateUser(form.value).subscribe({
      next: (res) => {
        if (res.ok) {
          this.alert.showMessage('User updated successfully', 'success');
          this.dialogRef.close(res.body);
        }
      },
      error: (err) => {
        this.alert.showMessage('Error while adding user', 'error');
      },
    });
  }
}
