import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';

import { Map } from 'mapbox-gl';
import { MapComponent } from 'ngx-mapbox-gl';
import { Place } from 'src/app/models/place';

@Component({
  selector: 'sp-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent {

  @ViewChild(MapComponent) map: MapComponent;
  @Output() screenBoundsEmitter = new EventEmitter();
  @Input() places: any[] = [];
  @Input() activeItem?: any;
  startPlace = [-100.3715367, 39.041718];

  constructor() { }

  onLoad(mapInstance?: Map) {
    this.screenBoundsEmitter.emit(mapInstance.getBounds());
  }
  reloadPlaces() {
    this.screenBoundsEmitter.emit(this.map.mapInstance.getBounds());
  }

  onPinClick(place: Place) {
    this.activeItem = place;
  }
  isActive(place: Place) {
    if (!this.activeItem) {
      this.activeItem = this.places[0];
    }
    return place.id === this.activeItem.id;
  }
}
