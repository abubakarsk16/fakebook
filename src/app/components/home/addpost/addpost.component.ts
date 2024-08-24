import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddpostDialogComponent } from './addpost-dialog/addpost-dialog.component';
import { Post } from 'src/app/interfaces/post.interface';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.scss'],
})
export class AddpostComponent implements OnInit, OnDestroy {
  dialogCloseSub!: Subscription;

  @Output() newPostEvent = new EventEmitter<Post>();
  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {}

  openPostDialog() {
    const dialogRef = this.dialog.open(AddpostDialogComponent, {
      width: '500px',
      disableClose: true,
    });
    this.dialogCloseSub = dialogRef.afterClosed().subscribe((result) => {
      if (result !== null) {
        this.newPostEvent.emit(result);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.dialogCloseSub) {
      this.dialogCloseSub.unsubscribe();
    }
  }
}
