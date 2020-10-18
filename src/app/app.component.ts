import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showSidenav = false;

  items: Observable<any[]>;
  constructor(
    db: AngularFirestore
  ) {
    this.items = db.collection('items').valueChanges();
  }


}
