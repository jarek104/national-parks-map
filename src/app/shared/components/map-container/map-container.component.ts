import { ExplorerService } from './../../services/explorer.service';
import { Photo } from './../../../models/photo';
import { Component, ViewChild, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { MapComponent } from 'ngx-mapbox-gl';
import { Map } from 'mapbox-gl';
import { Observable } from 'rxjs';
import { Place } from 'src/app/models/place';

@Component({
  selector: 'sp-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements OnInit {

  @ViewChild(MapComponent) map: MapComponent;
  @Output() screenBoundsEmitter = new EventEmitter();
  @Input() places: Place[] = [];
  activePlaceIndex: Observable<number>;
  highlightedPointIndex: number;

  constructor(
    private explorerService: ExplorerService
  ) { }

  ngOnInit() {
    this.activePlaceIndex = this.explorerService.activePlaceIndex;
    this.activePlaceIndex.subscribe(data => {
      this.highlightedPointIndex = data;
    });
  }

  onLoad(mapInstance?: Map) {
    this.screenBoundsEmitter.emit(mapInstance.getBounds());
  }
  reloadPlaces() {
    this.screenBoundsEmitter.emit(this.map.mapInstance.getBounds());
  }
}
