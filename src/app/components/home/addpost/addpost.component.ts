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
import { LayoutService } from 'src/app/services/layout.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.scss'],
})
export class AddpostComponent implements OnInit, OnDestroy {
  LayoutSubscription!: Subscription;
  dialogSubscription!: Subscription;
  @Output() forwardNewPost = new EventEmitter<Post>();
  constructor(
    private dialog: MatDialog,
    private layoutService: LayoutService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  openPostDialog() {
    const dialogRef = this.dialog.open(AddpostDialogComponent, {
      width: '500px',
    });
    this.dialogSubscription =
      dialogRef.componentInstance.newPostEvent.subscribe((result) => {
        this.forwardNewPost.emit(result);
      });
  }

  handlePost() {
    this.LayoutSubscription = this.layoutService
      .isMobile()
      .subscribe((isMobile) => {
        if (!isMobile) {
          this.openPostDialog();
        } else {
          this.router.navigate(['post']);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
    if (this.LayoutSubscription) {
      this.LayoutSubscription.unsubscribe();
    }
  }
}
