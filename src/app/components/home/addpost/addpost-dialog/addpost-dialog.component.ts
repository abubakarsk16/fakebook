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

@Component({
  selector: 'app-addpost-dialog',
  templateUrl: './addpost-dialog.component.html',
  styleUrls: ['./addpost-dialog.component.scss'],
})
export class AddpostDialogComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  newPost!: FormGroup;
  user!: User;
  @Output() newPostEvent = new EventEmitter<Post>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private postService: PostService,
    private snackbar: SnackbarService,
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
    this.subscription = this.postService.createPost(data).subscribe(
      (response) => {
        if (response.ok) {
          this.newPostEvent.emit(data);
          this.snackbar.showMessage(
            'Post created successfully',
            'success-snackbar',
            3000
          );
          this.dialogRef.close(true);
        }
      },
      (error) => {
        this.snackbar.showMessage(
          'Failed to create post',
          'error-snackbar',
          3000
        );
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
