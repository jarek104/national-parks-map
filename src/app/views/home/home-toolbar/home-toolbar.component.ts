import { Component, OnInit } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ExplorerService } from 'src/app/shared/services/explorer.service';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/services/user-data.service';
import { convertSnaps } from 'src/app/shared/services/utils';

@Component({
  selector: 'app-home-toolbar',
  templateUrl: './home-toolbar.component.html',
  styleUrls: ['./home-toolbar.component.scss']
})
export class HomeToolbarComponent implements OnInit {

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
    console.log('toolbar login call');
    
    this.authService.initializeAuth();
  }

  logout() {
    this.authService.logout();
  }
}
