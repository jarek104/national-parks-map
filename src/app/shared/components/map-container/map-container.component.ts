import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LngLat, LngLatBounds, Map, Marker } from 'mapbox-gl';

import { ExplorerService } from '../../services/explorer.service';
import { MapComponent } from 'ngx-mapbox-gl';
import { Photo } from 'src/app/models/photo';
import { Place } from 'src/app/models/place';
import { UploadService } from './../../services/upload.service';

@Component({
  selector: 'sp-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements OnInit {
  startPlace = [-100.3715367, 39.041718];

  draggablePin$?: BehaviorSubject<LngLat>;

  @ViewChild(MapComponent) map: MapComponent;

  selectedItem$: Observable<Place | Photo>;
  highlightedItem: Place | Photo;
  pinsInBounds$: Observable<Place[] | Photo[]>;

  constructor(
    private explorerService: ExplorerService,
    private uploadService: UploadService,
  ) { }

  ngOnInit() {
    this.pinsInBounds$ = this.explorerService.pinsInBounds$;
    this.selectedItem$ = this.explorerService.selectedItem$;
    this.draggablePin$ = this.uploadService.draggablePin$;
    
    this.explorerService.highlightedItem$.subscribe(item => this.highlightedItem = item);
    
    this.explorerService.goToPoint$.subscribe(point => {
      if (this.map && point) {
        this.map?.mapInstance.flyTo({
            center: point,
            // minZoom: 0,
            zoom: 10,
            bearing: 0, 
            speed: 1,
            curve: 1,
            essential: true
          }
        )
      }
    });

    this.explorerService.fitItemsToBounds$.subscribe(items => {
      if (this.map && items?.length > 0) {
        let bounds = new LngLatBounds();
        items.forEach((item: Place | Photo) => {
          let point = new LngLat(Number(item.geopoint.longitude), Number(item.geopoint.latitude));
          bounds.extend(point);
        });
        this.map?.mapInstance.fitBounds(bounds, {
          padding: 100,
          speed: .8,
        });        
      }
    })
  }


  onDragEnd(marker: Marker) {
    this.draggablePin$.next(marker.getLngLat());
  }

  onLoad(mapInstance?: Map) {
    this.explorerService.currentBounds$.next(mapInstance.getBounds());
    let center = new LngLat(this.map.center[0], this.map.center[1])
    this.uploadService.boundsCenter$.next(center);
  }

  onMapMove() {
    this.explorerService.currentBounds$.next(this.map.mapInstance.getBounds())
       
  }
  
  onMove() {
    let center = this.map.mapInstance.getCenter();
    this.uploadService.boundsCenter$.next(center); 
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
    return 'lightcoral';
  }
}
