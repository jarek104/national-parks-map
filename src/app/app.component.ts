import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import { ExplorerService } from './shared/services/explorer.service';
import { convertSnaps } from './shared/services/utils';

@Component({
  selector: 'sp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showSidenav = false;
  selectedItem?: any;
  highlightedItem?: any;
  pinsInBounds$: Observable<any>;

  items: Observable<any[]>;
  constructor(
    db: AngularFirestore,
    private explorerService: ExplorerService,
  ) {
    this.items = db.collection('items').valueChanges();
  }

  ngOnInit() {
    this.pinsInBounds$ = this.explorerService.pinsInBounds$;
  }

  onItemSelected(item: any) {
    this.selectedItem = item;  
    this.pinsInBounds$ = this.explorerService.getPhotosByPlace$(item).pipe(
      map(photo => convertSnaps(photo))
    );
  }
  
  onItemHovered(item: any) {
    this.highlightedItem = item;
  }
}
