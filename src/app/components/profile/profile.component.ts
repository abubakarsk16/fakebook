import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/interfaces/comment.interface';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  maxLines: number = 5;
  newComment: FormGroup;
  showAll: boolean = false;
  fetchSubs!: Subscription;
  createSubs!: Subscription;
  comments: Comment[] = [];
  isLoading: boolean = true;
  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private alert: SnackbarService
  ) {
    this.newComment = this.fb.group({
      postId: [''],
      name: [''],
      email: [''],
      body: [''],
    });
  }

  ngOnInit(): void {
    this.fetchSubs = this.commentService.fetchComments(1).subscribe({
      next: (res) => {
        if (res.ok) {
          this.isLoading = false;
          this.comments = res.body!;
        }
      },
    });
  }

  handleFieldFocus(divEl: HTMLDivElement) {
    divEl.style.display = 'flex';
    divEl.style.transform = 'translateY(0)';
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
            console.log(res);
            if (res.ok) {
              this.comments = [res.body!, ...this.comments];
              console.log(this.comments);
            }
          },
          error: (err) => {
            this.alert.showMessage('Error while posting comment!', 'error');
          },
        });
      this.showAll = true;
      this.newComment.reset();
    }
  }

  toggleCommentsShow() {
    this.showAll = this.showAll ? false : true;
  }

  ngOnDestroy(): void {
    if (this.fetchSubs) {
      this.fetchSubs.unsubscribe();
    }
    if (this.createSubs) {
      this.createSubs.unsubscribe();
    }
  }
}
