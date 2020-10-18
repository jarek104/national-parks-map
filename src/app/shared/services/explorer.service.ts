import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Photo } from 'src/app/models/photo';
import { HttpClient } from '@angular/common/http';
import { Place } from 'src/app/models/place';
import { PLACES } from 'src/assets/mocks/places';

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {
  private jsonFileURL = '../assets/mocks/photos2.json';

  activePlaceIndex = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient,
  ) {

  }
  getFilteredPhotos(): Observable<Photo[]> {
    return this.http.get<any>(this.jsonFileURL);
  }
  getFilteredPlaces(): Observable<Place[]> {
    return of(PLACES);
  }
}
