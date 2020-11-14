import * as firebase from 'firebase';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { concatMap, last, switchMap } from 'rxjs/operators';

import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ExplorerService } from 'src/app/shared/services/explorer.service';
import { LngLat } from 'mapbox-gl';
import { MatChipInputEvent } from '@angular/material/chips';
import { Tag } from 'src/app/models/tag';
import { UploadService } from './../../shared/services/upload.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'sp-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit {

  // tags: Tag[] = [Tag.Beach, Tag.Desert, Tag.Forest, Tag.Lake, Tag.Mountain, Tag.Waterfall];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedPlace?: any;
  photoFile?: File;

  places = [];
  placeForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    dateCreated: new FormControl(new Date()),
    geopoint: new FormControl(''),
    photoIds: new FormControl([])
  });

  photoForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    dateCreated: new FormControl(new Date()),
    geopoint: new FormControl(''),
    // tags: new FormControl(this.tags),
  });

  constructor(

    private exploreService: ExplorerService,
    private uploadService: UploadService,

  ) { }

  ngOnInit() {
    this.exploreService.pinsInBounds$.next([]);

    this.uploadService.draggablePin$.next(this.uploadService.boundsCenter$.value);

    this.uploadService.boundsCenter$.subscribe((center: LngLat) => {
      this.uploadService.draggablePin$.next(center);
      this.placeForm.patchValue({
        geopoint: `${center.lat}, ${center.lng}`
      })
    });
    // this.explorerService.placesInBounds$.subscribe(places =>
    //   this.places = places
    // )
    
  }

  onGeopointBlur(point: string) {
    let points = point.split(', ');
    let pin = new LngLat(Number(points[1]), Number(points[0]));
    this.exploreService.goToPoint$.next(pin);
  }

  onPlaceSubmit() {
    let geo = this.placeForm.get('geopoint').value;
    geo = this.parseGeopoint(geo);
    geo = new firebase.firestore.GeoPoint(Number(geo[0]), Number(geo[1]));
    this.placeForm.patchValue({
      geopoint: geo
    })
    console.log(this.placeForm.value)
    this.uploadService.createPlace(this.placeForm.value);
  }

  get photoIds() {
    return this.placeForm.get('photoIds');
  }

  onAddPhotoId(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.photoIds.setValue([...this.photoIds.value, value.trim()]);
      this.photoIds.updateValueAndValidity();
    }
    
    if (input) {
      input.value = '';
    }
    console.log(this.photoIds.value);
  }
  onRemovePhotoId(id: string) {
    const index = this.photoIds.value.indexOf(id);
    
    if (index >= 0) {
      this.photoIds.value.splice(index, 1);
      this.photoIds.updateValueAndValidity();
    }
    console.log(this.photoIds.value);
  }
  
  onPhotoSubmit() {
    let geo = this.photoForm.get('geopoint').value;
    geo = this.parseGeopoint(geo);
    geo = new firebase.firestore.GeoPoint(Number(geo[0]), Number(geo[1]));
    this.photoForm.patchValue({
      geopoint: geo
    })

    // this.firestore.collection('photos').add({
    //   placeId: this.selectedPlace.id,
    //   ...this.photoForm.value
    // }).then(photoDoc => {
    //   if (photoDoc) {
    //     const filePath = `photos/${photoDoc.id}/${this.photoFile.name}`;

    //     const uploadTask = this.fireStorage.upload(filePath, this.photoFile);

    //     uploadTask.snapshotChanges().pipe(
    //       last(),
    //       concatMap(() => this.fireStorage.ref(filePath).getDownloadURL()),
    //       switchMap(downloadUrl => {
    //         return forkJoin([
    //           this.firestore.collection('places').doc(`${this.selectedPlace.id}`).update({
    //            photoIds: firebase.firestore.FieldValue.arrayUnion(photoDoc.id)
    //          }),
    //          this.firestore.collection('photos').doc(`${photoDoc.id}`).update({
    //            downloadUrl
    //          })
    //         ])
    //       })
    //     ).subscribe(console.log);
    //   }
    // })
  }

  parseGeopoint(point: string) {
    let val = point.split(',');
    val.forEach(item => item.replace(',', '').trim())
    return val;
  }

  addTag(event: any) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const myTags = this.photoForm.get('tags').value;
      myTags.push(Number(value));
      this.photoForm.patchValue({
        tags: myTags
      })
    }

    if (input) {
      input.value = '';
    }
    
    
  }
  removeTag(event: any) {
    const myTags = this.photoForm.get('tags').value;
    const index = myTags.indexOf(event);

    if (index >= 0) {
      myTags.splice(index, 1);
      this.photoForm.patchValue({
        tags: myTags
      })
    }
  }
  getTagString(tag: number) {
    return Tag[tag];
  }

  uploadFile(event: any) {
    this.photoFile = event.target.files[0];
  }
}
