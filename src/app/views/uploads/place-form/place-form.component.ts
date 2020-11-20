import * as firebase from 'firebase';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ExplorerService } from 'src/app/shared/services/explorer.service';
import { LngLat } from 'mapbox-gl';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSelectChange } from '@angular/material/select';
import { Place } from 'src/app/models/place';
import { Subscription } from 'rxjs';
import { UploadService } from 'src/app/shared/services/upload.service';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.scss']
})
export class PlaceFormComponent implements OnInit {

  placeForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    dateCreated: new FormControl(new Date()),
    geopoint: new FormControl(''),
  });

  subs = new Subscription;
  selectedPlace?: Place;
  places = [];

  constructor(
    private explorerService: ExplorerService,
    private uploadService: UploadService,
  ) { }

  ngOnInit(): void {
    this.subs.add(
      this.placeForm.valueChanges.subscribe(change => {
        if (typeof change.geopoint !== 'string' && change.geopoint !== undefined) {
          this.placeForm.patchValue({
            geopoint: `${change.geopoint.latitude}, ${change.geopoint.longitude}`
          })
        }
      })
    )

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
    
    this.selectedPlace ? this.uploadService.updatePlace(this.selectedPlace.id, place) : this.uploadService.createPlace(place);
  }

  parseGeopoint(point: string) {
    let val = point.split(',');
    val.forEach(item => item.replace(',', '').trim())
    return val;
  }

}
