import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from 'src/app/models/photo';
// import { PLACES } from 'src/assets/mocks/places';
import { Place } from 'src/app/models/place';
// import { USERS } from 'src/assets/mocks/users';
import { User } from 'src/app/models/user';
import { convertSnaps } from 'src/app/shared/services/utils';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private jsonFileURL = '../assets/mocks/photos2.json';

  constructor(
    private firestore: AngularFirestore,
  ) {

  }

}
