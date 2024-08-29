import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Album } from 'src/app/interfaces/album.interface';
import { User } from 'src/app/interfaces/user.interface';
import { AlbumService } from 'src/app/services/album.service';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit, OnDestroy {
  albums!: Album[];
  user!: User;
  loading: boolean = true;
  subscription!: Subscription;
  constructor(
    private albumService: AlbumService,
    private alert: SnackbarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getAuthUser();
    this.subscription = this.albumService
      .fetchAlumsByUser(this.user.id)
      .subscribe({
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
