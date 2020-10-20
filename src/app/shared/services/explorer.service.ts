import { filter, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { Place } from 'src/app/models/place';
import { LngLatBounds, LngLatLike } from 'mapbox-gl';

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
    console.log('init service');

    this.allPlaces$ = this.firestore.collection('places')
    .snapshotChanges().pipe(
      map(places => {
        return places.map(place => {
          return {
            id: place.payload.doc.id,
            ...place.payload.doc.data() as {},
          }
        })
      })
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
}
