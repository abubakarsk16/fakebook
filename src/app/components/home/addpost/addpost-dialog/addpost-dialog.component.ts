import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { PostService } from '../../../../services/post.service';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces/post.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmService } from 'src/app/services/confirm.service';

@Component({
  selector: 'app-addpost-dialog',
  templateUrl: './addpost-dialog.component.html',
  styleUrls: ['./addpost-dialog.component.scss'],
})
export class AddpostDialogComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  subscription!: Subscription;
  newPost!: FormGroup;
  user!: User;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private postService: PostService,
    private snackbar: SnackbarService,
    private confirmService: ConfirmService,
    private dialogRef: MatDialogRef<AddpostDialogComponent>
  ) {
    this.user = this.authService.getAuthUser();

    this.newPost = this.fb.group({
      userId: [this.user.id],
      id: [Math.floor(Math.random() * 101 + 100)],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      body: [''],
    });
  }

  ngOnInit(): void {}

  handleCreatePost(data: Post) {
    this.loading = true;
    this.subscription = this.postService.createPost(data).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.ok) {
          this.snackbar.showMessage('Post created successfully', 'success');
          this.dialogRef.close(data);
        }
      },
      error: (err) => {
        this.loading = false;
        this.snackbar.showMessage('Failed to create post', 'error');
      },
    });
  }

  async handleDialogClose(postForm: FormGroup) {
    if (postForm.value.title !== '' || postForm.value.body !== '') {
      const isConfirmed = await this.confirmService.confirmAction(
        'Unsaved changes',
        'Changes you have made will not be saved. Are you sure you want to discard post?'
      );
      if (isConfirmed) {
        this.dialogRef.close(null);
      }
    } else {
      this.dialogRef.close(null);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
