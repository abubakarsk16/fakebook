import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackBarRef: MatSnackBarRef<SnackbarComponent>
  ) {}

  ngOnInit(): void {}

  closeSnackbar(): void {
    this.snackBarRef.dismiss();
  }
}
