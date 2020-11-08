import * as firebase from 'firebase/app';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { LngLatBounds, LngLatLike } from 'mapbox-gl';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import { ExplorationMode } from 'src/app/models/exploration';
import { Injectable } from '@angular/core';
import { Photo } from './../../models/photo';
import { Place } from 'src/app/models/place';
import { convertSnaps } from './utils';

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {
  activePlaceIndex = new BehaviorSubject<number>(0);
  placesInBounds$ = new BehaviorSubject<any[]>([]);
  photosInPlace$ = new BehaviorSubject<any[]>([]);
  allPlaces$: Observable<Place[]>;
  explorationMode$ = new BehaviorSubject<ExplorationMode>(ExplorationMode.places);
  currentBounds$ = new BehaviorSubject<LngLatBounds | undefined>(undefined);


  constructor(
    private firestore: AngularFirestore,
  ) {
    
    this.allPlaces$ = this.firestore.collection('places')
      .stateChanges().pipe(
        map(places => convertSnaps(places)),
    );

  }

  getPlacesInBounds$(bounds: LngLatBounds) {        
    if (!bounds) {
      return of([]);
    }    
    return this.allPlaces$.pipe(
      map(places => {
        return places.filter(place => {
          const location = [place.geopoint.longitude, place.geopoint.latitude];
          return bounds.contains(location as LngLatLike)
        })
      }),
      distinctUntilChanged(),
    )
  }
  getPhotosInBounds$(bounds: LngLatBounds) {        
    if (!bounds) {
      return of([]);
    }    
    return this.firestore.collection('photos')
    .stateChanges().pipe(
      map(data => convertSnaps(data)),
      map((photos: Photo[]) => {
        return photos.filter(photo => {
          const location = [photo.geopoint.longitude, photo.geopoint.latitude];
          return bounds.contains(location as LngLatLike)
        })
      }),
      distinctUntilChanged(),
    )
  }
  getPlaceById$(id: string) {    
    if (!id) {
      return undefined;
    }
    return this.allPlaces$.pipe(
      map((places: Place[]) => {        
        if (places) {
          return places.find(item => item.id === id);
        }
        return undefined;
      })
    )
  }

  getPlacePhotosCollection(place: Place) {    
    if (place.photoIds) {
      return this.firestore.collection('photos', photos => photos.where(firebase.firestore.FieldPath.documentId(), 'in', place.photoIds))
        .snapshotChanges();
    }
  }
}
