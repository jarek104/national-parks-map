import * as firebase from 'firebase';

import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loggedInUser$ = new BehaviorSubject<firebase.auth.UserCredential>(undefined);

  constructor(
    private userService: UserService,
  ) {}

  initializeAuth() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result: firebase.auth.UserCredential) => {
      console.log(result);
      this.loggedInUser$.next(result)
      if (result.user.emailVerified && result.additionalUserInfo.isNewUser) {
        this.userService.createNewUser(result);
      }
      // This gives you a Google Access Token. You can use it to access the Google API.
      var credential = result.credential as firebase.auth.OAuthCredential
      let token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  logout() {
    firebase.auth().signOut();
    this.loggedInUser$.next(undefined);
  }

  
}
