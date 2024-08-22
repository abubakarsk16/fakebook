import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces/post.interface';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  loading: boolean = true;
  subscription: Subscription;
  constructor(private postService: PostService) {
    this.subscription = this.postService.fetchPosts().subscribe({
      next: (res) => {
        this.loading = false;
        this.posts = res;
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
