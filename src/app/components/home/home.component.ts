import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces/post.interface';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading: boolean = true;
  subscription!: Subscription;
  constructor(
    private postService: PostService,
    private alert: SnackbarService
  ) {
    this.subscription = this.postService.fetchPosts().subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.ok) {
          this.posts = res.body!;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.alert.showMessage('Error while fetching posts', 'error');
      },
    });
  }

  ngOnInit(): void {}

  trackByPostId(index: number, post: Post): number {
    return post.id;
  }

  getNewPost(newPost: Post) {
    this.posts = [newPost, ...this.posts];
  }

  getEditedPost(data: Post) {
    this.posts = this.posts.map((post) => (post.id !== data.id ? post : data));
  }

  removePost(postId: number) {
    this.posts = this.posts.filter((post) => post.id !== postId);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
