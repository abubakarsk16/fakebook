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

  updateComment(data: Comment): Observable<HttpResponse<Comment>> {
    return this.http.put<Comment>(
      `https://jsonplaceholder.typicode.com/comments/${data.id}`,
      data,
      { observe: 'response' }
    );
  }
  deleteComment(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<Comment>(
      `https://jsonplaceholder.typicode.com/comments/${id}`,
      { observe: 'response' }
    );
  }
}
