import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Comment } from 'src/app/interfaces/comment.interface';

@Component({
  selector: 'app-comment-bottom-sheet',
  templateUrl: './comment-bottom-sheet.component.html',
  styleUrls: ['./comment-bottom-sheet.component.scss'],
})
export class CommentBottomSheetComponent implements OnInit {
  newComment!: Comment;
  commentCount: number = -1;
  constructor(
    private bottomSheetRef: MatBottomSheetRef<CommentBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: number
  ) {}

  ngOnInit(): void {}

  handleClose() {
    this.bottomSheetRef.dismiss(this.commentCount);
  }
  renderNewComment(comment: Comment) {
    this.newComment = comment;
  }
}
