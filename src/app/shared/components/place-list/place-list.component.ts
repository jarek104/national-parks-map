import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ExplorerService } from './../../services/explorer.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Observable } from 'rxjs';
import { Place } from 'src/app/models/place';
import { PlaceService } from '../../services/place.service';
import { Tag } from 'src/app/models/tag';
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
    this.places$ = this.explorerService.currentBounds$.pipe(
      switchMap(_ => this.explorerService.getPlacesInBounds$()),
    );
  }

  onItemHover(item?: Place) {    
    item ? this.explorerService.highlightedItem$.next(item) : this.explorerService.highlightedItem$.next(undefined)
  }

  isActive(place: Place) {
    return this.explorerService.highlightedItem$.value?.id === place.id;
  }

}
