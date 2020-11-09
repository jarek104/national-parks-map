import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ExplorerService } from './../../services/explorer.service';
import { Observable } from 'rxjs';
import { Place } from 'src/app/models/place';
import { PlaceService } from '../../services/place.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss']
})
export class PlaceListComponent implements OnInit {

  places$?: Observable<Place[]>;

  constructor(
    private explorerService: ExplorerService,
  ) { }

  ngOnInit(): void {
    console.log('init');
    
    this.places$ = this.explorerService.currentBounds$.pipe(
      switchMap(_ => this.explorerService.getPlacesInBounds$()),
    );
    
  }

  onItemClicked(item: Place) {
    // this.itemClicked.emit(item)    
  }

  onItemHover(item?: Place) {    
    // item ? this.itemHovered.emit(item) : this.itemHovered.emit(undefined);
  }

}
