import * as firebase from 'firebase/app';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { LngLat, LngLatBounds, LngLatLike } from 'mapbox-gl';
import { distinctUntilChanged, filter, map, switchMap, take, tap } from 'rxjs/operators';

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
  allPlaces$ = new BehaviorSubject<Place[]>([]);
  currentBounds$ = new BehaviorSubject<mapboxgl.LngLatBounds | undefined>(undefined);
  currentPhotoFilters$ = new BehaviorSubject<Tag[]>([]);
  goToPoint$ = new BehaviorSubject<LngLat | undefined>(undefined);


  constructor(
    private firestore: AngularFirestore,
  ) {
    this.firestore.collection('places')
      .stateChanges().pipe(
        map(snaps => {
          return convertSnaps(snaps) as Place[];
        }),
    ).subscribe(places => this.allPlaces$.next(places));
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
    
  getPhotosInBounds(): Photo[] {        
    if (!this.currentBounds$.value) {
      return [];
    }
    const bounds = this.currentBounds$.value; 
    const photoFilters = this.currentPhotoFilters$.value; 
    const north = new firebase.firestore.GeoPoint(this.currentBounds$.value.getNorth(), 0)
    const south = new firebase.firestore.GeoPoint(this.currentBounds$.value.getSouth(), 0)

    this.firestore
      .collection('photos', ref => ref
          .where('geopoint', '<', north)
          .where('geopoint', '>', south))
          .snapshotChanges().pipe(
            map(data => convertSnaps(data)),
            map((photos: Photo[]) => {              
              return photos.filter(photo => {
                const location = [photo.geopoint.longitude, photo.geopoint.latitude];
                return bounds.contains(location as LngLatLike)
              })
            }),
            map((photos: Photo[]) => {
              return photos.filter(photo => {
                if (photoFilters.length > 0) {
                  return photo.tags.some(tag => photoFilters.indexOf(tag) > -1)
                } 
                return photo;
              })
            }),
    ).subscribe((photos: Photo[]) => {
      this.pinsInBounds$.next(photos);
      return photos;
    })
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
