import * as firebase from 'firebase';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { debounce, debounceTime, delay } from 'rxjs/operators';

import { ExplorerService } from 'src/app/shared/services/explorer.service';
import { LngLat } from 'mapbox-gl';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSelectChange } from '@angular/material/select';
import { Photo } from './../../../models/photo';
import { Place } from 'src/app/models/place';
import { Tag } from 'src/app/models/tag';
import { UploadService } from 'src/app/shared/services/upload.service';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.scss']
})
export class PhotoFormComponent implements OnInit {

  tagKeys = Object.keys(Tag);
  tagValues = Object.values(Tag);
  filteredKeys = [];
  tags = Tag;

  @ViewChild('tagsInput') tagsInput: ElementRef<HTMLInputElement>;

  photoForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    dateCreated: new FormControl(new Date()),
    geopoint: new FormControl(''),
    placeId: new FormControl(''),
    authorId: new FormControl(''),
    tags: new FormControl([]),
  });

  subs = new Subscription;
  places: Place[] = [];
  photos: Photo[] = [];

  selectedPlaceId: string;
  selectedPhoto: Photo;

  photoFile?: File;

  constructor(
    private explorerService: ExplorerService,
    private uploadService: UploadService,
  ) { 
    this.filteredKeys = this._filterTags([])
  }
  
  ngOnInit(): void {
    this.explorerService.pinsInBounds$.next([]);
    this.uploadService.draggablePin$.next(this.uploadService.boundsCenter$.value);
    this.subs.add(
      this.photoForm.get('tags').valueChanges.subscribe(values => {
        this.filteredKeys = this._filterTags(values);
      })
    )

    this.subs.add(
      // this.photoForm.valueChanges.pipe(
      //   debounceTime(500)
      // ).subscribe(change => {      
      //   if (change.geopoint.latitude) {
      //     this.photoForm.patchValue({
      //       geopoint: `${change.geopoint.latitude}, ${change.geopoint.longitude}`
      //     })
      //   }
      // })
    )

    this.subs.add(
      this.uploadService.boundsCenter$.subscribe((center: LngLat) => {
        console.log('center', center)
        this.uploadService.draggablePin$.next(center);
        this.photoForm.patchValue({
          geopoint: `${center.lat}, ${center.lng}`
        })
      })
    )

    this.subs.add(
      this.explorerService.allPlaces$.subscribe(places =>
        this.places = places
      )
    )

    this.subs.add(
      this.explorerService.allPhotos$.subscribe(photos =>
        this.photos = photos
      )
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onPlaceSelect(change: MatSelectChange) {
    this.selectedPlaceId = change.value;
  }

  onPhotoSelect(change: MatSelectChange) {
    this.selectedPhoto = change.value as Photo;
    this.photoForm.reset();
    if (!change.value) {
      return;
    }
    this.photoForm.patchValue(change.value);

    let pin = new LngLat(Number(change.value.geopoint.longitude), Number(change.value.geopoint.latitude));
    this.explorerService.goToPoint$.next(pin);
  }

  parseGeopoint(point: string) {
    let val = point.split(',');
    val.forEach(item => item.replace(',', '').trim())
    return val;
  }

  onRemoveTag(event: any) {
    const myTags = this.photoForm.get('tags').value;
    const index = myTags.indexOf(event);

    if (index >= 0) {
      myTags.splice(index, 1);
      this.photoForm.patchValue({
        tags: myTags
      })
    }
  }

  onGeopointBlur(point: string) {
    let points = point.split(', ');
    let pin = new LngLat(Number(points[1]), Number(points[0]));
    this.explorerService.goToPoint$.next(pin);
  }
  
  getTagString(tag: number) {
    return Tag[tag];
  }

  uploadFile(event: any) {
    this.photoFile = event.target.files[0];
  }

  onTagSelected(event: MatAutocompleteSelectedEvent): void {    
    const myTags = this.photoForm.get('tags').value;
    myTags.push(event.option.viewValue);
    this.photoForm.patchValue({
      tags: myTags
    })
    this.tagsInput.nativeElement.value = '';
  }

  onPhotoSubmit() {
    let photo = this.photoForm.value as Photo;
    let geo = this.photoForm.get('geopoint').value;
    geo = this.parseGeopoint(geo);
    geo = new firebase.firestore.GeoPoint(Number(geo[0]), Number(geo[1]));
    
    photo.geopoint = geo;

    this.selectedPhoto ? 
      this.uploadService.updatePhoto(this.selectedPhoto.id, photo) : 
      this.uploadService.uploadPhoto(photo, this.selectedPlaceId, this.photoFile);
    
  }
  
  private _filterTags(currentValues: string[]): string[] {
    if (!currentValues) {
      return this.tagValues;
    }
    return this.tagValues.filter(tag => currentValues.indexOf(tag) === -1);
  }

}
