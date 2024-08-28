import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces/post.interface';
import { User } from 'src/app/interfaces/user.interface';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  userId!: number;
  user!: User;
  posts!: Post[];
  loading: boolean = true;
  paramSubs!: Subscription;
  userSubs!: Subscription;
  postSubs!: Subscription;
  constructor(
    private router: ActivatedRoute,
    private userService: UserService,
    private alert: SnackbarService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.paramSubs = this.router.params.subscribe((result) => {
      this.userId = result['userId'];
      if (this.userId) {
        this.userSubs = this.userService.getUserById(this.userId).subscribe({
          next: (res) => {
            this.loading = false;
            this.user = res;
          },
          error: (err) => {
            this.loading = false;
            this.alert.showMessage("Error while fetching user's info", 'error');
          },
        });
        this.postSubs = this.postService
          .fetchPostByUser(this.userId)
          .subscribe({
            next: (res) => {
              if (res.ok) {
                this.posts = res.body!;
              }
            },
            error: (err) => {
              this.alert.showMessage(
                "Error while fetching user's posts",
                'error'
              );
            },
          });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.paramSubs) {
      this.paramSubs.unsubscribe();
    }
    if (this.userSubs) {
      this.userSubs.unsubscribe();
    }
    if (this.postSubs) {
      this.postSubs.unsubscribe();
    }
  }
}
