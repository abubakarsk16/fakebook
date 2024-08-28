import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss'],
})
export class AddUserDialogComponent implements OnInit {
  newUserForm!: FormGroup;
  subscription!: Subscription;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private alert: SnackbarService,
    private dialogRef: MatDialogRef<AddUserDialogComponent>
  ) {}

  ngOnInit(): void {
    this.newUserForm = this.fb.group({
      name: [''],
      username: [''],
      email: [''],
    });
  }
  isSubmitDisable() {
    return (
      this.newUserForm.value.name.trim() === '' ||
      this.newUserForm.value.username.trim() === '' ||
      this.newUserForm.value.email.trim() === ''
    );
  }

  addUser(form: FormGroup) {
    this.subscription = this.userService.createUser(form.value).subscribe({
      next: (res) => {
        if (res.ok) {
          this.alert.showMessage('User added successfully', 'success');
          this.dialogRef.close(res.body);
        }
      },
      error: (err) => {
        this.alert.showMessage('Error while adding user', 'error');
      },
    });
  }
}
