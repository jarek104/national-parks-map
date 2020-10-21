import * as firebase from 'firebase/app'

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/firestore';
import { ExplorerService } from './../../services/explorer.service';
import { Tag } from 'src/app/models/tag';

@Component({
  selector: 'sp-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss']
})
export class GenerateComponent implements OnInit {
  tags: Tag[] = [Tag.Beach, Tag.Desert, Tag.Forest, Tag.Lake, Tag.Mountain, Tag.Waterfall];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedPlace?: any;

  places = [];
  form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    dateCreated: new FormControl(new Date()),
    geopoint: new FormControl('')
  });

  photoForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    dateCreated: new FormControl(new Date()),
    geopoint: new FormControl(''),
    tags: new FormControl(this.tags),
  });

  constructor(
    private firestore: AngularFirestore,
    private explorerService: ExplorerService) {
  }

  ngOnInit() {
    // this.explorerService.placesInBounds$.subscribe(places =>
    //   this.places = places
    // )
    this.firestore.collection('places').snapshotChanges().subscribe(returnedPlaces => {
      this.places = returnedPlaces.map(place => {
        return {
          id: place.payload.doc.id,
          ...place.payload.doc.data() as {},
        }
      })
      console.log(this.places)
    });
  }

  onSubmit() {
    let geo = this.form.get('geopoint').value;
    geo = this.parseGeopoint(geo);
    geo = new firebase.firestore.GeoPoint(Number(geo[0]), Number(geo[1]));
    this.form.patchValue({
      geopoint: geo
    })
    this.firestore.collection('places').add(this.form.value);
  }

  onPhotoSubmit() {
    let geo = this.photoForm.get('geopoint').value;
    geo = this.parseGeopoint(geo);
    geo = new firebase.firestore.GeoPoint(Number(geo[0]), Number(geo[1]));
    this.photoForm.patchValue({
      geopoint: geo
    })
    const ref = this.firestore.collection('photos').add({
      placeId: this.selectedPlace.id,
      ...this.photoForm.value
    }).then(newDoc => {
      if (newDoc) {
        this.firestore.collection('places').doc(`${this.selectedPlace.id}`).update({
          photoIds: firebase.firestore.FieldValue.arrayUnion(newDoc.id)
        })
      }
    })
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
}
