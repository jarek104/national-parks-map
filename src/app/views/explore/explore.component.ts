import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CarouselComponent } from 'src/app/shared/components/carousel/carousel.component';
import { ExplorerService } from './../../shared/services/explorer.service';
import { LngLatBounds } from 'mapbox-gl';
import { convertSnaps } from 'src/app/shared/services/utils';
import { map } from 'rxjs/operators';

@Component({
  selector: 'sp-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  @ViewChild(CarouselComponent) carousel: CarouselComponent;
  selectedItem?: any;
  photosFromPlace$?: Observable<any>;
  showingPlaces = true;

  placesInBounds$: Observable<any>;

  constructor(
    private explorerService: ExplorerService
  ) {}

  ngOnInit(): void {
  }
  onScreenBoundChange(bounds: LngLatBounds) {
    this.placesInBounds$ = this.explorerService.getPlacesInBounds$(bounds);
  }

  onItemSelected(item: any) {
    this.selectedItem = item;
    this.showingPlaces = false;
    this.photosFromPlace$ = this.explorerService.getPhotosCollection(item).pipe(
      map(photo => convertSnaps(photo))
    );
  }

  toggleView(){
    this.showingPlaces = !this.showingPlaces;
  }
}
