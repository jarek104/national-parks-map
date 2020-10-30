import * as firebase from 'firebase/app';

import { BehaviorSubject, Observable } from 'rxjs';
import { LngLatBounds, LngLatLike } from 'mapbox-gl';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Place } from 'src/app/models/place';
import { convertSnaps } from './utils';

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {
  activePlaceIndex = new BehaviorSubject<number>(0);
  placesInBounds$ = new BehaviorSubject<any[]>([]);
  allPlaces$ = new BehaviorSubject<any>(undefined);


  constructor(
    private firestore: AngularFirestore,
  ) {
    this.firestore.collection('places')
      .stateChanges().pipe(
        map(places => convertSnaps(places)),
    ).subscribe(data => this.allPlaces$.next(data));
  }

  getPlacesInBounds$(bounds: LngLatBounds) {
    return this.allPlaces$.pipe(
      map(places => {
        console.log('getPlacesInBounds');
        return places.filter(place => {
          const location = [place.geopoint.longitude, place.geopoint.latitude];
          return bounds.contains(location as LngLatLike)
        })
      }),
      distinctUntilChanged(),
    )
  }
  getPlaceById$(id: string) {
    return this.allPlaces$.pipe(
      map((places: Place[]) => places.find(item => item.id === id))
    )
  }

  getPhotosCollection(place: Place) {
    if (place.photoIds) {
      return
    }
    return this.firestore.collection('photos', photos => photos.where(firebase.firestore.FieldPath.documentId(), 'in', place.photoIds))
      .snapshotChanges();
  }
}
