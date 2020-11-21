import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from './../../models/user';

@Injectable({
  providedIn: 'root'
})
export class NprService {


  constructor(
    private http: HttpClient,
  ) {}
  
  getParkData$() {
    return this.http.get('https://developer.nps.gov/api/v1/parks?limit=600&api_key=COpPZJCP6JqktIqYR5O3QIUbWJgQI8lh0HMyXRQJ');
  }
  
}
