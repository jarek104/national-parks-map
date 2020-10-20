import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { ExplorerService } from './../../services/explorer.service';
import { Map } from 'mapbox-gl';
import { MapComponent } from 'ngx-mapbox-gl';
import { Observable } from 'rxjs';
import { Photo } from './../../../models/photo';
import { Place } from 'src/app/models/place';

@Component({
  selector: 'sp-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements OnInit {

  @ViewChild(MapComponent) map: MapComponent;
  @Output() screenBoundsEmitter = new EventEmitter();
  @Input() places: any[] = [];
  startPlace = [-100.3715367, 39.041718];

  activePlace?: Place;

  constructor(
    private explorerService: ExplorerService
  ) { }

  ngOnInit() {
  }

  onLoad(mapInstance?: Map) {
    this.screenBoundsEmitter.emit(mapInstance.getBounds());
  }
  reloadPlaces() {
    this.screenBoundsEmitter.emit(this.map.mapInstance.getBounds());
  }

  onPinClick(place: Place) {
    console.log(place);
    this.activePlace = place;
  }
  isActive(place: Place) {
    if (!this.activePlace) {
      this.activePlace = this.places[0];
    }
    return place.id === this.activePlace.id;
  }
}
