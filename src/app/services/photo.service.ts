import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from '../interfaces/photo.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private http: HttpClient) {}

  getPhotosByAlbum(albumId: number): Observable<HttpResponse<Photo[]>> {
    return this.http.get<Photo[]>(
      `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`,
      { observe: 'response' }
    );
  }
}
