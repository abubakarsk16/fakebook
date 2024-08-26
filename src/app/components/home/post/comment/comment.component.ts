import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment.interface';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  constructor() {}
  date = Date.now();
  @Input() comment!: Comment;
  ngOnInit(): void {}
}
