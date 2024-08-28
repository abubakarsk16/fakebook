import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Album } from 'src/app/interfaces/album.interface';
import { AlbumService } from 'src/app/services/album.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit, OnDestroy {
  albums!: Album[];
  loading: boolean = true;
  subscription!: Subscription;
  constructor(
    private albumService: AlbumService,
    private alert: SnackbarService
  ) {}

  ngOnInit(): void {
    this.subscription = this.albumService.fetchAlums().subscribe({
      next: (res) => {
        this.loading = false;
        if (res.ok) {
          this.albums = res.body!;
        }
      },
      error: (err) => {
        this.loading = false;
        this.alert.showMessage('Error while fetching albums', 'error');
      },
    });
  }
  ngOnDestroy(): void {}
}
