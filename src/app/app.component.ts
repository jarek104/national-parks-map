import * as firebase from 'firebase';

import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { map, shareReplay, switchMap } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from './shared/services/authentication.service';
import { ExplorerService } from './shared/services/explorer.service';
import { UserService } from './shared/services/user.service';
import { convertSnaps } from './shared/services/utils';

@Component({
  selector: 'sp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showSidenav = false;
  pinsInBounds$: Observable<unknown[]>;
  items: Observable<any[]>;
  userInfo$: Observable<firebase.User>;

  constructor(
    db: AngularFirestore,
    private explorerService: ExplorerService,
    private userService: UserService,
    private authService: AuthenticationService
  ) {
    this.userInfo$ = this.authService.loggedInUser$.pipe(shareReplay());
    this.items = db.collection('items').valueChanges();
  }

  ngOnInit() {
    this.pinsInBounds$ = this.explorerService.pinsInBounds$;

  }
  
  onItemSelected(item: any) {
    this.pinsInBounds$ = this.explorerService.getPhotosByPlace$(item).pipe(
      map(photo => convertSnaps(photo))
    );
  }

  login() {
    this.authService.initializeAuth();
  }

  logout() {
    this.authService.logout();
  }
}
