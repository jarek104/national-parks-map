import * as firebase from 'firebase/app';

import { BehaviorSubject, Observable } from 'rxjs';
import { LngLatBounds, LngLatLike } from 'mapbox-gl';
import { filter, map, tap } from 'rxjs/operators';

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
  allPlaces$?: Observable<any>;

  constructor(
    private firestore: AngularFirestore,
  ) {
    this.allPlaces$ = this.firestore.collection('places')
      .snapshotChanges().pipe(
        map(places => convertSnaps(places))
    )
  }

  getPlacesInBounds$(bounds: LngLatBounds) {
    return this.allPlaces$.pipe(
      map(places => {
        return places.filter(place => {
          const location = [place.geopoint.longitude, place.geopoint.latitude];
          return bounds.contains(location as LngLatLike)
        })
      })
    )
  }

  getPhotosCollection(place: Place) {
    console.log('place', place.photoIds);
    return this.firestore.collection('photos', photos => photos.where(firebase.firestore.FieldPath.documentId(), 'in', place.photoIds)).snapshotChanges();
  }
}
