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
    externalImageFileUrl: new FormControl(''),
    externalImagePageUrl: new FormControl(''),
    externalAuthor: new FormControl(''),
    externalAuthorUrl: new FormControl(''),
    tags: new FormControl([]),
  });

  subs = new Subscription;
  places: Place[] = [];
  photos: Photo[] = [];

  selectedPlaceId: string;
  selectedPhoto: Photo;

  photoFile?: File;
  photoString?: string;

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
      this.uploadService.boundsCenter$.subscribe((center: LngLat) => {
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
    if (change.value) {
      const newPlace = this.places.find(place => place.id === change.value);
      let pin = new LngLat(Number(newPlace.geopoint.longitude), Number(newPlace.geopoint.latitude));
      this.explorerService.goToPoint$.next(pin)
      this.selectedPlaceId = change.value;
    }
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

  async onImageUrlBlur(value: any) {
    const reader = new FileReader();
    console.log(value);
    await fetch(value).then(r => r.blob())
      .then(blobFile => {
        this.photoFile = new File([blobFile], "cc.jpg", {type: "image/jpeg", lastModified: new Date().getTime()})
        reader.readAsDataURL(blobFile);
    
        reader.onload = () => {
          this.photoString = reader.result as string;
        };
      });
  }
  
  getTagString(tag: number) {
    return Tag[tag];
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.photoFile = file;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.photoString = reader.result as string;
      };
   
    }
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

      this.photoForm.reset();
    
  }
  
  private _filterTags(currentValues: string[]): string[] {
    if (!currentValues) {
      return this.tagValues;
    }
    return this.tagValues.filter(tag => currentValues.indexOf(tag) === -1);
  }

  onHtmlBlockBlur(text: string) {
    var element = document.createElement('div'); 
    element.innerHTML = text; 
    var imgs = element.getElementsByTagName("img");
    var anchors = element.getElementsByTagName("a");

    this.photoForm.patchValue({
      externalImageFileUrl: imgs[0].getAttribute("src")
    })
    this.photoForm.patchValue({
      title: imgs[0].getAttribute("alt")
    })
    this.photoForm.patchValue({
      externalImagePageUrl: anchors[0].getAttribute("href")
    })
    this.photoForm.patchValue({
      externalAuthorUrl: anchors[1].getAttribute("href")
    })
    this.photoForm.patchValue({
      externalAuthor: anchors[1].innerHTML
    })

  }
}
