import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album } from '../interfaces/album.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  constructor(private http: HttpClient) {}

  fetchAlumsByUser(userId: number): Observable<HttpResponse<Album[]>> {
    return this.http.get<Album[]>(
      `https://jsonplaceholder.typicode.com/albums?userId=${userId}`,
      { observe: 'response' }
    );
  }
}
