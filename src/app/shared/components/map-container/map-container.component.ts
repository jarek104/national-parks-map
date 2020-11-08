import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';

import { ExplorerService } from '../../services/explorer.service';
import { Map } from 'mapbox-gl';
import { MapComponent } from 'ngx-mapbox-gl';
import { Photo } from 'src/app/models/photo';
import { Place } from 'src/app/models/place';

@Component({
  selector: 'sp-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent {

  @ViewChild(MapComponent) map: MapComponent;
  @Output() itemClicked = new EventEmitter();
  @Input() places: any[] = [];
  @Input() activeItem?: any;
  @Input() hoveredItem?: any;
  startPlace = [-100.3715367, 39.041718];

  constructor(
    private explorerService: ExplorerService,
  ) { }

  onLoad(mapInstance?: Map) {
    this.explorerService.currentBounds$.next(mapInstance.getBounds())
  }
  reloadPlaces() {
    this.explorerService.currentBounds$.next(this.map.mapInstance.getBounds())
  }

  onPinClick(item: Place | Photo) {
    this.activeItem = item;
    this.itemClicked.emit(this.activeItem)
  }

  getPinStyle(place: Place | undefined): string {
    if (place) {
      if (this.activeItem && place.id === this.activeItem.id) {
        return 'lightcoral';
      } else if (this.hoveredItem && place.id === this.hoveredItem.id) {
        return '#66ff00';
      }
    }
    return '#475467';
  }
}
