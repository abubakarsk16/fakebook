import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  createPost(newPost: Post): Observable<HttpResponse<Post>> {
    return this.http.post<Post>(
      'https://jsonplaceholder.typicode.com/posts',
      newPost,
      {
        observe: 'response',
      }
    );
  }

  fetchPosts(): Observable<HttpResponse<Post[]>> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
      observe: 'response',
    });
  }

  editPost(post: Post) {
    return this.http.put(
      `https://jsonplaceholder.typicode.com/posts/${post.id}`,
      post,
      {
        observe: 'response',
      }
    );
  }

  deletePost(postId: number) {
    return this.http.delete(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      { observe: 'response' }
    );
  }
}
