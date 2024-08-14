import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddpostDialogComponent } from './addpost-dialog/addpost-dialog.component';
@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.scss'],
})
export class AddpostComponent implements OnInit {
  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {}

  openPostDialog() {
    const dialogRef = this.dialog.open(AddpostDialogComponent, {
      width: '500px',
    });
    console.log(dialogRef);
  }
}
