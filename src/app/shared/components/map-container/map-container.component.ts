import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';

import { ExplorerService } from '../../services/explorer.service';
import { Map } from 'mapbox-gl';
import { MapComponent } from 'ngx-mapbox-gl';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/models/photo';
import { Place } from 'src/app/models/place';

@Component({
  selector: 'sp-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements OnInit{
  startPlace = [-100.3715367, 39.041718];

  @ViewChild(MapComponent) map: MapComponent;

  selectedItem$: Observable<unknown>;
  highlightedItem$: Observable<unknown>;
  pinsInBounds$: Observable<unknown[]>;

  constructor(
    private explorerService: ExplorerService,
  ) { }

  ngOnInit() {
    this.pinsInBounds$ = this.explorerService.pinsInBounds$;
    this.selectedItem$ = this.explorerService.selectedItem$;
    this.highlightedItem$ = this.explorerService.highlightedItem$;
  }

  onLoad(mapInstance?: Map) {
    this.explorerService.currentBounds$.next(mapInstance.getBounds())
  }
  reloadPlaces() {
    this.explorerService.currentBounds$.next(this.map.mapInstance.getBounds())
  }

  onPinClick(item: Place | Photo) {
    this.explorerService.selectedItem$.next(item);
  }
  
  onPinHover(item?: Place | Photo) {    
    item ? this.explorerService.highlightedItem$.next(item) : this.explorerService.highlightedItem$.next(undefined);
  }

  getPinStyle(pin: Place | undefined): string {
    const activeItem = this.explorerService.selectedItem$.value;
    const hoveredItem = this.explorerService.highlightedItem$.value;

    if (pin) {
      if (activeItem && pin.id === activeItem.id) {
        return 'lightcoral';
      } else if (hoveredItem && pin.id === hoveredItem.id) {
        return '#66ff00';
      }
    }
    return '#475467';
  }
}
