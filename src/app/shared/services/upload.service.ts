import { BehaviorSubject, Observable } from 'rxjs';

import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { LngLat } from 'mapbox-gl';
import { Place } from 'src/app/models/place';
import { convertSnaps } from 'src/app/shared/services/utils';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  draggablePin$ = new BehaviorSubject<LngLat>(new LngLat(0 ,0));
  boundsCenter$ = new BehaviorSubject<LngLat>(new LngLat(0 ,0));

  places: Place[];

  constructor(
    private firestore: AngularFirestore,
    private fireStorage: AngularFireStorage,
  ) { 
    this.firestore.collection('places').snapshotChanges().subscribe(snaps => {
      this.places = convertSnaps(snaps) as Place[];
    })
  }

  createPlace(place: Place) {
    this.firestore.collection('places').add(place);
  }

}
