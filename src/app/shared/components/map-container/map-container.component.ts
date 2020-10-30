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
  @Output() itemSelected = new EventEmitter();
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

  onPinClick(item: Place | Photo) {
    this.activeItem = item;
    this.itemSelected.emit(this.activeItem)
  }
  isActive(place: Place) {
    if (this.activeItem) {
      return place.id === this.activeItem.id;
    } 
    return false;
  }
}
