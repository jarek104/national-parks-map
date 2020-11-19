import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from './../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userInfo$ = new BehaviorSubject<firebase.auth.UserCredential>(undefined);

  constructor(
    private firestore: AngularFirestore,
    private fireStorage: AngularFireStorage,
  ) {}

  createNewUser(user: firebase.auth.UserCredential) {
    let userData = this._parseNewGoogleUser(user);
    this.firestore.collection('users').add(userData);
  }

  getUserData$(userId: string) {

  }

  private _parseNewGoogleUser(userData: firebase.auth.UserCredential) {
    let user: Partial<User> = {
      dateCreated: new Date(),
      contactEnabled: false,
      email: userData.user.email,
      name: userData.user.displayName,
      bio: '',
      uploadedPhotoIds: [],
      favoritePhotoIds: [],
    }
    return user;
  }

  private _parseExistingGoogleUser(userData: firebase.auth.UserCredential) {
    let user: Partial<User> = {
      email: userData.user.email,
      name: userData.user.displayName,
    }
    return user;
  }
  
}
