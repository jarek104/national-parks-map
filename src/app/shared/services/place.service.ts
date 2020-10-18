import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PLACES } from 'src/assets/mocks/places';
import { Place } from 'src/app/models/place';
import { USERS } from 'src/assets/mocks/users';
import { User } from 'src/app/models/user';
import { Photo } from 'src/app/models/photo';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private jsonFileURL = '../assets/mocks/photos2.json';

  constructor(
    private http: HttpClient,
  ) {

  }
  getPlaceDetails(id: string): Observable<Place> {
    const myPlace = PLACES.find(place => place.id === id);
    return of(myPlace);
  }
  getAuthor(userId: string): Observable<User> {
    const myUser = USERS.find(user => user.id === userId);
    return of(myUser);
  }
  getAlternativePhotos(photoIds: string[]): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.jsonFileURL);
    // const myPhoto = this.http.get(this.jsonFileURL).pipe(
    //   map((photos: Photo[]) => {
    //     photos.filter((photo) =>
    //       photoIds.every((photoId) => photoId === photo.id));
    //   }),
    //   tap(test => console.log(test))
    // );
    // return of(myPhoto);
  }
}
