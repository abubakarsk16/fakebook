import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/interfaces/comment.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  newComment!: FormGroup;

  @Output() commentPostEvent = new EventEmitter<Comment>();
  @Output() editEvent = new EventEmitter<Comment>();
  @Input() postId!: number;
  @Input() updatedComment!: Comment;
  @ViewChild('commentBox') commentBox!: ElementRef;

  createSubs!: Subscription;
  updateSubs!: Subscription;
  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private alert: SnackbarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getAuthUser();

    this.newComment = this.fb.group({
      postId: [this.postId],
      name: [user.name],
      email: [user.email],
      body: [''],
    });
  }

  handleFieldFocus(textarea: HTMLTextAreaElement, divEl: HTMLDivElement) {
    textarea.rows = 5;
    divEl.style.display = 'flex';
  }

  handleKeyDown(event: KeyboardEvent, commentBox: HTMLTextAreaElement) {
    if (event.key === 'Enter' && !event.ctrlKey) {
      event.preventDefault();
      this.postComment(this.newComment);
    } else if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault();
      commentBox.value += '\n';
    }
  }

  postComment(commentForm: FormGroup) {
    const comment = commentForm.value.body.trim(' ');
    if (comment !== '') {
      this.createSubs = this.commentService
        .createComment(commentForm.value)
        .subscribe({
          next: (res) => {
            if (res.ok) {
              this.commentPostEvent.emit(res.body!);
            }
          },
          error: (err) => {
            this.alert.showMessage('Error while posting comment!', 'error');
          },
        });
      commentForm.get('body')?.reset('');
    }
  }
}
