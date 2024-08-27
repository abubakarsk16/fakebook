import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/interfaces/comment.interface';
import { CommentService } from 'src/app/services/comment.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss'],
})
export class CommentSectionComponent implements OnInit, OnChanges, OnDestroy {
  showAll: boolean = false;
  loadingComments: boolean = true;
  comments: Comment[] = [];

  @Input() postId!: number;
  @Input() newComment!: Comment;
  @Output() commentCountEvent = new EventEmitter<number>();

  fetchCmntsSubs!: Subscription;

  constructor(
    private commentService: CommentService,
    private alert: SnackbarService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newComment']) {
      this.comments = [this.newComment, ...this.comments];
      this.commentCountEvent.emit(this.comments.length);
    }
  }

  ngOnInit(): void {
    this.fetchCmntsSubs = this.commentService
      .fetchComments(this.postId)
      .subscribe({
        next: (res) => {
          this.loadingComments = false;
          if (res.ok) {
            this.comments = res.body!;
            this.commentCountEvent.emit(res.body!.length);
          }
        },
        error: (err) => {
          this.loadingComments = false;
          this.alert.showMessage('Error while fetching comments', 'error');
        },
      });
  }

  toggleCommentsShow() {
    this.showAll = !this.showAll;
  }
  trackById(index: number, comment: Comment) {
    return comment.id;
  }

  renderEditedComment(data: Comment) {
    this.comments = this.comments.map((value) =>
      value.id !== data.id ? value : data
    );
  }
  removeComment(id: number) {
    this.comments = this.comments.filter((comment) => comment.id !== id);
    this.commentCountEvent.emit(this.comments.length);
  }

  ngOnDestroy(): void {
    if (this.fetchCmntsSubs) {
      this.fetchCmntsSubs.unsubscribe();
    }
  }
}
