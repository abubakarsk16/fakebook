import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces/post.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ConfirmService } from 'src/app/services/confirm.service';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss'],
})
export class EditpostComponent implements OnInit {
  loading: boolean = false;
  editedPost: FormGroup;
  subscription!: Subscription;
  @Output() editPostEvent = new EventEmitter<Post>();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private confirmService: ConfirmService,
    private dialogRef: MatDialogRef<EditpostComponent>,
    private postService: PostService,
    private alert: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: { post: Post; user: User }
  ) {
    this.editedPost = this.fb.group({
      userId: [this.data.post.userId],
      id: [this.data.post.id],
      title: [
        this.data.post.title,
        [Validators.required, Validators.maxLength(100)],
      ],
      body: [this.data.post.body],
    });
  }

  ngOnInit(): void {}

  handlePostEdit(post: Post) {
    this.loading = true;
    this.subscription = this.postService.editPost(post).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.ok) {
          this.editPostEvent.emit(post);
          this.alert.showMessage('Post edited successfully', 'success');
          this.dialogRef.close(post);
        }
      },
      error: (err) => {
        this.loading = false;
        this.alert.showMessage('Some error while editing post!', 'error');
      },
    });
  }

  async handleDialogClose(editedPost: Post) {
    if (
      editedPost.title !== this.data.post.title ||
      editedPost.body !== this.data.post.body
    ) {
      const confirmed = await this.confirmService.confirmAction(
        'Unsaved changes',
        'Changes you have made will not be saved. Are you sure you want to discard editing?'
      );
      if (confirmed) {
        this.dialogRef.close(null);
      }
    } else {
      this.dialogRef.close(null);
    }
  }
}
