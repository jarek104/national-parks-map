import * as firebase from 'firebase';

import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { concatMap, last, switchMap } from 'rxjs/operators';

import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { LngLat } from 'mapbox-gl';
import { Photo } from 'src/app/models/photo';
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
  
  updatePlace(id: string, place: Partial<Place>) {    
    this.firestore.collection('places').doc(id).update(place);
  }

  uploadPhoto(photo: Partial<Photo>, placeId: string, photoFile) {
    this.firestore.collection('photos').add({
      placeId: placeId,
      ...photo
    }).then(photoDoc => {
      if (photoDoc) {
        const originalFileName = `original.${photoFile.name.split('.').pop()}`; // original.png
        const filePath = `photos/${photoDoc.id}/${originalFileName}`;        
        const uploadTask = this.fireStorage.upload(filePath, photoFile);

        uploadTask.snapshotChanges().pipe(
          last(),
          concatMap(() => this.fireStorage.ref(filePath).getDownloadURL()),
          switchMap((originalDownloadUrl: string) => {
            return this.firestore.collection('photos').doc(`${photoDoc.id}`).update({
              originalDownloadUrl,
              originalFileName
            })
          })
        ).subscribe();
      }
    })
  }
  
  updatePhoto(id: string, photo: Partial<Photo>) {    
    this.firestore.collection('photos').doc(id).update(photo);
  }

}
