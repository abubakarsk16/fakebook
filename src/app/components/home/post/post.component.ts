import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces/post.interface';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { EditpostComponent } from '../editpost/editpost.component';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ConfirmService } from 'src/app/services/confirm.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
  postDate = Date.now();

  @Input() post!: Post;
  @Output() dialogResult = new EventEmitter<Post>();
  @Output() deletePostEvent = new EventEmitter<number>();

  userOfPost!: User;
  loadingUser: boolean = true;

  dialogSubscription!: Subscription;
  deleteSubscription!: Subscription;
  userSubscription!: Subscription;

  constructor(
    private userService: UserService,
    private editDialog: MatDialog,
    private postService: PostService,
    private alert: SnackbarService,
    private confirmService: ConfirmService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.userService
      .getUserById(this.post.userId)
      .subscribe({
        next: (res) => {
          this.loadingUser = false;
          this.userOfPost = res;
        },
        error: (err) => {
          this.loadingUser = false;
          this.alert.showMessage('Error while fetching data', 'error');
        },
      });
  }

  handleEditClick() {
    const dialogRef = this.editDialog.open(EditpostComponent, {
      data: { post: this.post, user: this.userOfPost },
      width: '500px',
      disableClose: true,
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe((result) => {
      if (result !== null) {
        this.dialogResult.emit(result);
      }
    });
  }

  async handleDeleteClick(postId: number) {
    const isConfirmed = await this.confirmService.confirmAction(
      'Delete post',
      'Are you sure you want to delete post?'
    );
    if (isConfirmed) {
      this.deleteSubscription = this.postService.deletePost(postId).subscribe({
        next: (res) => {
          if (res.ok) {
            this.deletePostEvent.emit(postId);
            this.alert.showMessage('Post deleted successfully', 'success');
          }
        },
        error: (err) => {
          this.alert.showMessage('Post delete failed', 'error');
        },
      });
    }
    return;
  }
  ngOnDestroy(): void {
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
