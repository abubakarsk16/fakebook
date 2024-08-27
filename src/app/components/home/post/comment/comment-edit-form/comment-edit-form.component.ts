import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/interfaces/comment.interface';
import { CommentService } from 'src/app/services/comment.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-comment-edit-form',
  templateUrl: './comment-edit-form.component.html',
  styleUrls: ['./comment-edit-form.component.scss'],
})
export class CommentEditFormComponent implements OnInit {
  editedComment!: FormGroup;
  @Input() comment!: Comment;
  @Output() editEvent = new EventEmitter<Comment>();
  @Output() cancelEvent = new EventEmitter<void>();
  subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private alert: SnackbarService
  ) {}

  ngOnInit(): void {
    this.editedComment = this.fb.group({
      postId: [this.comment.postId],
      id: [this.comment.id],
      name: [this.comment.name],
      email: [this.comment.email],
      body: [this.comment.body],
    });
  }

  handleFieldFocus(divEl: HTMLDivElement) {
    divEl.style.display = 'flex';
  }

  handleKeyDown(event: KeyboardEvent, commentBox: HTMLTextAreaElement) {
    if (event.key === 'Enter' && !event.ctrlKey) {
      event.preventDefault();
      this.editComment(this.editedComment.value);
    } else if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault();
      commentBox.value += '\n';
    }
  }

  editComment(commentData: Comment) {
    this.subscription = this.commentService
      .updateComment(commentData)
      .subscribe({
        next: (res) => {
          if (res.ok) {
            this.editEvent.emit(res.body!);
          }
        },
        error: (err) => {
          this.editEvent.emit(commentData);
          this.alert.showMessage('Error while updating comment', 'error');
        },
      });
  }

  handleCancel() {
    this.cancelEvent.emit();
  }
}
