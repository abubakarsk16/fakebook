import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/interfaces/comment.interface';
import { CommentService } from 'src/app/services/comment.service';
import { ConfirmService } from 'src/app/services/confirm.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit, OnDestroy {
  constructor(
    private commentService: CommentService,
    private alert: SnackbarService,
    private confirmService: ConfirmService
  ) {}
  date = Date.now();
  isEditMode: boolean = false;
  @Input() comment!: Comment;
  @Output() editEvent = new EventEmitter<Comment>();
  @Output() deleteEvent = new EventEmitter<number>();
  subscription!: Subscription;

  ngOnInit(): void {}

  showEditForm() {
    this.isEditMode = true;
  }

  getAndForwardComment(data: Comment) {
    this.editEvent.emit(data);
    this.isEditMode = false;
  }

  cancelEditing() {
    this.isEditMode = false;
  }

  async handleDeleteComment(deleteId: number) {
    const isConfirmed = await this.confirmService.confirmAction(
      'Delete comment',
      'Are you sure you want to delete the comment?'
    );
    if (isConfirmed) {
      this.subscription = this.commentService
        .deleteComment(deleteId)
        .subscribe({
          next: (res) => {
            if (res.ok) {
              this.deleteEvent.emit(deleteId);
              this.alert.showMessage('Comment deleted successfully', 'success');
            }
          },
          error: (err) => {
            this.deleteEvent.emit(deleteId);
            this.alert.showMessage('Error while deleting comment', 'error');
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
