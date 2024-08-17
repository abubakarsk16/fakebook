import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; description: string },
    private dialogRef: MatDialogRef<ConfirmComponent>
  ) {}

  ngOnInit(): void {}

  handleClickYes() {
    this.dialogRef.close(true);
  }
  handleClickNo() {
    this.dialogRef.close(false);
  }
}
