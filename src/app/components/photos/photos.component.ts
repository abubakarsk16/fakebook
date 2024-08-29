import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Photo } from 'src/app/interfaces/photo.interface';
import { PhotoService } from 'src/app/services/photo.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit, OnDestroy {
  photos: Photo[] = [];
  loading: boolean = true;
  albumId!: number;

  paramSubs!: Subscription;
  photoSubs!: Subscription;

  constructor(
    private activeRoute: ActivatedRoute,
    private photoService: PhotoService,
    private alert: SnackbarService
  ) {}

  ngOnInit(): void {
    this.paramSubs = this.activeRoute.queryParams.subscribe((result) => {
      this.photoSubs = this.photoService
        .getPhotosByAlbum(result['id'])
        .subscribe({
          next: (res) => {
            this.loading = false;
            if (res.ok) {
              this.photos = res.body!;
            }
          },
          error: (err) => {
            this.loading = false;
            this.alert.showMessage('Error while fetching photos', 'error');
          },
        });
    });
  }

  trackById(index: number, photo: Photo): number {
    return photo.id;
  }

  ngOnDestroy(): void {
    if (this.paramSubs) {
      this.paramSubs.unsubscribe();
    }
    if (this.photoSubs) {
      this.photoSubs.unsubscribe();
    }
  }
}
