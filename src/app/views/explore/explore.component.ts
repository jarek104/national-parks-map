import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';

import { CarouselComponent } from 'src/app/shared/components/carousel/carousel.component';
import { ExplorerService } from './../../shared/services/explorer.service';
import { LngLatBounds } from 'mapbox-gl';
import { Observable } from 'rxjs';
import { Place } from 'src/app/models/place';
import { convertSnaps } from 'src/app/shared/services/utils';

@Component({
  selector: 'sp-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  @ViewChild(CarouselComponent) carousel: CarouselComponent;
  selectedItem?: any;
  highlightedItem?: any;
  showingPlaces = true;
  currentBounds?: any;
  
  photosFromPlace$?: Observable<any>;
  pinsInBounds$: Observable<any>;

  constructor(
    private explorerService: ExplorerService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {    
    this.route.params.pipe(
      switchMap(params => {
        return this.explorerService.getPlaceById$(params['placeId'])
      })
    ).subscribe(item => {
      item ? this.onItemSelected(item) : this.router.navigate(['explore', '_']);
    });
  }
  onScreenBoundChange(bounds: LngLatBounds) {
    if (this.showingPlaces) {
      this.currentBounds = bounds;
      this.pinsInBounds$ = this.explorerService.getPlacesInBounds$(bounds);
    }
  }

  onItemSelected(item: any) {
    this.selectedItem = item;    
    this.showingPlaces = false;
    
    this.pinsInBounds$ = this.explorerService.getPlacePhotosCollection(item).pipe(
      map(photo => convertSnaps(photo))
    );
  }
  
  onItemHovered(item: any) {
    this.highlightedItem = item;
  }

  onBackClicked(){
    this.showingPlaces = true;    
    this.pinsInBounds$ = this.explorerService.getPlacesInBounds$(this.currentBounds);
  }

}
