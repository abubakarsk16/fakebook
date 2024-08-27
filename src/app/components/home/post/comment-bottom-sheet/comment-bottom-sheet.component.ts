import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-comment-bottom-sheet',
  templateUrl: './comment-bottom-sheet.component.html',
  styleUrls: ['./comment-bottom-sheet.component.scss'],
})
export class CommentBottomSheetComponent implements OnInit {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<CommentBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  handleClose() {
    this.bottomSheetRef.dismiss();
  }
}
