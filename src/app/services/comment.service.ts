import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../interfaces/comment.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  fetchComments(postId: number): Observable<HttpResponse<Comment[]>> {
    return this.http.get<Comment[]>(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
      { observe: 'response' }
    );
  }

  createComment(newComment: Comment): Observable<HttpResponse<Comment>> {
    return this.http.post<Comment>(
      'https://jsonplaceholder.typicode.com/comments',
      newComment,
      { observe: 'response' }
    );
  }
}
