import * as firebase from 'firebase';

import { Component, OnInit } from '@angular/core';
import { concatMap, last, map, switchMap, tap } from 'rxjs/operators';

import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ExplorerService } from 'src/app/shared/services/explorer.service';
import { NprService } from './../../shared/services/npr.service';
import { Place } from 'src/app/models/place';
import { UploadService } from 'src/app/shared/services/upload.service';

@Component({
  selector: 'sp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private npr: NprService,
    private explorerService: ExplorerService,
    private uploadService: UploadService,
    private firestore: AngularFirestore,
    private fireStorage: AngularFireStorage,
  ) { }
  data$: any;

  places = [];

  ngOnInit() {
    this.explorerService.allPlaces$.subscribe((data: Place[]) => {
      
      this.places = data.filter(place => place.originalFileName === undefined);
      console.log('this.places', this.places);
    })
  }

  async onClick() {
    await this.places.forEach(place => {
      fetch(place.coverPhotoUrl).then(r => r.blob())
      .then(blobFile => {
        let file = new File([blobFile], 'original.jpg', { type: "image/jpeg" });

        const originalFileName = `original.jpg`; // original.png
        const filePath = `placeCovers/${place.id}/${originalFileName}`;        
        const uploadTask = this.fireStorage.upload(filePath, file);

        uploadTask.snapshotChanges().pipe(
          last(),
          concatMap(() => this.fireStorage.ref(filePath).getDownloadURL()),
          switchMap((originalDownloadUrl: string) => {
            return this.firestore.collection('places').doc(`${place.id}`).update({
              originalDownloadUrl,
              originalFileName
            })
          })
        ).subscribe();
      });
    })
    
  }


  getData() {
    // this.data$ = this.npr.getParkData$();

    this.npr.getParkData$().pipe(
      map((parksData: any) => parksData.data),
      tap(data => console.log(data)),
      map((parks: any[]) => {
        return parks
        .filter(park => {
          return park.designation.toLowerCase().indexOf("national lakeshore") > -1 ||
          park.designation.toLowerCase().indexOf("national seashore") > -1 ||
          park.designation.toLowerCase().indexOf("national park") > -1
        })
        // .map(park => {
        //   return {
        //     title: park.fullName,
        //     geopoint: new firebase.firestore.GeoPoint(Number(park.latitude), Number(park.longitude)),
        //     description: park.description,
        //     type: park.designation,
        //     website: park.url,
        //     states: park.states,
        //     coverPhotoUrl: park.images[0].url
        //   }
        // })
      }),
      tap(data => console.log(data)),
    ).subscribe(data => {

      this.explorerService.pinsInBounds$.next(data as Place[]);
      // this.batchCreate(data);
    })
  }

  batchCreate(data: any[]) {
    let db = firebase.firestore();
    let batch = db.batch();
    data.forEach((doc) => {
      var docRef = db.collection("places").doc();
      batch.set(docRef, doc);
    });

    batch.commit();
  }

}
