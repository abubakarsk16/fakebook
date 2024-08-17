import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/app/interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  create(newPost: Post) {
    return this.http.post(
      'https://jsonplaceholder.typicode.com/posts',
      newPost,
      { observe: 'response' }
    );
  }
}
