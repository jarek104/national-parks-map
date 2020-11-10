import * as firebase from 'firebase/app';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { LngLatBounds, LngLatLike } from 'mapbox-gl';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Photo } from './../../models/photo';
import { Place } from 'src/app/models/place';
import { Tag } from 'src/app/models/tag';
import { convertSnaps } from './utils';

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {
  activePlaceIndex = new BehaviorSubject<number>(0);
  pinsInBounds$ = new BehaviorSubject<any[]>([]);
  selectedItem$ = new BehaviorSubject<any>(undefined);
  highlightedItem$ = new BehaviorSubject<any>(undefined);
  allPlaces$: Observable<Place[]>;
  currentBounds$ = new BehaviorSubject<LngLatBounds | undefined>(undefined);
  currentPhotoFilters$ = new BehaviorSubject<Tag[]>([]);


  constructor(
    private firestore: AngularFirestore,
  ) {
    this.allPlaces$ = this.firestore.collection('places')
      .stateChanges().pipe(
        map(places => convertSnaps(places)),
    );
  };

  getPlacesInBounds$(): Observable<Place[]> {        
    if (!this.currentBounds$.value) {
      return of([]);
    }
    const bounds = this.currentBounds$.value;   
    return this.allPlaces$.pipe(
      map(places => {
        return places.filter(place => {
          const location = [place.geopoint.longitude, place.geopoint.latitude];
          return bounds.contains(location as LngLatLike)
        })
      }),
      distinctUntilChanged(),
      tap(places => this.pinsInBounds$.next(places)),
      )
    };
    
    getPhotosInBounds$(): Observable<Photo[]> {        
      if (!this.currentBounds$.value) {
        return of([]);
      }
      const bounds = this.currentBounds$.value; 
      const photoFilters = this.currentPhotoFilters$.value; 

      let myRef;
      if (this.currentPhotoFilters$.value.length > 0) {
        myRef = this.firestore.collection('photos', ref => ref.where('tags', 'array-contains-any', this.currentPhotoFilters$.value));
      }
      else {
        myRef = this.firestore.collection('photos');
      }
      return myRef.stateChanges().pipe(
        tap(data => console.log('snaps', this.currentPhotoFilters$.value, data)),
        map(data => convertSnaps(data)),
        map((photos: Photo[]) => {
          return photos.filter(photo => {
            const location = [photo.geopoint.longitude, photo.geopoint.latitude];
            return bounds.contains(location as LngLatLike)
          })
        }),
        distinctUntilChanged(),
        tap((photos: Photo[]) => this.pinsInBounds$.next(photos)),
      )
    };

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
      }),
    )
  }

  getPhotosByPlace$(place: Place): Observable<Photo[]> {    
    if (place.photoIds) {
      return this.firestore.collection('photos', photos => photos.where(firebase.firestore.FieldPath.documentId(), 'in', place.photoIds))
        .snapshotChanges().pipe(
          map(photo => convertSnaps(photo))
        )
    }
  }
}
