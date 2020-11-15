import * as firebase from 'firebase';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ExplorerService } from 'src/app/shared/services/explorer.service';
import { LngLat } from 'mapbox-gl';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSelectChange } from '@angular/material/select';
import { Place } from 'src/app/models/place';
import { Subscription } from 'rxjs';
import { Tag } from 'src/app/models/tag';
import { UploadService } from './../../shared/services/upload.service';

@Component({
  selector: 'sp-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit, OnDestroy {

  // tags: Tag[] = [Tag.Beach, Tag.Desert, Tag.Forest, Tag.Lake, Tag.Mountain, Tag.Waterfall];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedPlace?: Place;
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

  subs = new Subscription;

  constructor(

    private explorerService: ExplorerService,
    private uploadService: UploadService,

  ) { }

  ngOnInit() {
    this.explorerService.pinsInBounds$.next([]);

    this.subs.add(
      this.placeForm.valueChanges.subscribe(change => {
        if (typeof change.geopoint !== 'string' && change.geopoint !== undefined) {
          this.placeForm.patchValue({
            geopoint: `${change.geopoint.latitude}, ${change.geopoint.longitude}`
          })
        }
      })
    )

    this.uploadService.draggablePin$.next(this.uploadService.boundsCenter$.value);

    this.subs.add(
      this.uploadService.boundsCenter$.subscribe((center: LngLat) => {
        this.uploadService.draggablePin$.next(center);
        this.placeForm.patchValue({
          geopoint: `${center.lat}, ${center.lng}`
        })
      })
    )

    this.subs.add(
      this.explorerService.allPlaces$.subscribe(places =>
        this.places = places
      )
    )
    
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
    this.uploadService.draggablePin$.next(undefined);
  }

  onPlaceSelect(change: MatSelectChange) {
    this.selectedPlace = change.value as Place;
    this.placeForm.patchValue(change.value);

    let pin = new LngLat(Number(change.value.geopoint.longitude), Number(change.value.geopoint.latitude));
    this.explorerService.goToPoint$.next(pin);
  }

  onGeopointBlur(point: string) {
    let points = point.split(', ');
    let pin = new LngLat(Number(points[1]), Number(points[0]));
    this.explorerService.goToPoint$.next(pin);
  }

  onPlaceSubmit() {
    let place = this.placeForm.value as Place;

    let geo = this.placeForm.get('geopoint').value;
    geo = this.parseGeopoint(geo);
    geo = new firebase.firestore.GeoPoint(Number(geo[0]), Number(geo[1]));

    place.geopoint = geo;
    console.log('place', place);
    
    this.selectedPlace ? this.uploadService.updatePlace(this.selectedPlace.id, place) : this.uploadService.createPlace(place);
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
  }

  onRemovePhotoId(id: string) {
    const index = this.photoIds.value.indexOf(id);
    
    if (index >= 0) {
      this.photoIds.value.splice(index, 1);
      this.photoIds.updateValueAndValidity();
    }
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
