import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';

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
  @Output() screenBoundsEmitter = new EventEmitter();
  @Output() itemClicked = new EventEmitter();
  @Input() places: any[] = [];
  @Input() activeItem?: any;
  @Input() hoveredItem?: any;
  startPlace = [-100.3715367, 39.041718];

  constructor() { }

  onLoad(mapInstance?: Map) {
    this.screenBoundsEmitter.emit(mapInstance.getBounds());
  }
  reloadPlaces() {
    this.screenBoundsEmitter.emit(this.map.mapInstance.getBounds());
  }

  onPinClick(item: Place | Photo) {
    this.activeItem = item;
    this.itemClicked.emit(this.activeItem)
  }

  getPinStyle(place: Place | undefined): string {
    if (place) {
      if (this.activeItem && place.id === this.activeItem.id) {
        return '#66ff00';
      } else if (this.hoveredItem && place.id === this.hoveredItem.id) {
        return 'lightcoral';
      }
    }
    return '#475467';
  }
}
