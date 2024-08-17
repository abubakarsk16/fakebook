import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { PostService } from '../../../../services/post.service';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces/post.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-addpost-dialog',
  templateUrl: './addpost-dialog.component.html',
  styleUrls: ['./addpost-dialog.component.scss'],
})
export class AddpostDialogComponent implements OnInit, OnDestroy {
  newPost!: FormGroup;
  user!: User;
  private subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private postService: PostService,
    private snackbar: SnackbarService
  ) {
    this.user = this.authService.getAuthUser();

    this.newPost = this.fb.group({
      userId: [this.user.id],
      id: [Math.floor(Math.random() * 101 + 100)],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''],
    });
  }

  ngOnInit(): void {}

  handleCreatePost(data: Post) {
    this.subscription = this.postService.create(data).subscribe(
      (response) => {
        if (response.ok) {
          this.snackbar.showMessage(
            'Post created successfully',
            'success-snackbar',
            3000
          );
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
