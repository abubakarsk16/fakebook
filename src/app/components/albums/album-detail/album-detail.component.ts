import { Component, Input, OnInit } from '@angular/core';
import { Album } from 'src/app/interfaces/album.interface';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss'],
})
export class AlbumDetailComponent implements OnInit {
  @Input() album!: Album;
  constructor() {}

  ngOnInit(): void {}
}
