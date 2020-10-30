import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { CarouselComponent } from 'src/app/shared/components/carousel/carousel.component';
import { ExplorerService } from './../../shared/services/explorer.service';
import { LngLatBounds } from 'mapbox-gl';
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
  photosFromPlace$?: Observable<any>;
  showingPlaces = true;
  currentBounds?: any;
  id = '';

  placesInBounds$: Observable<any>;

  constructor(
    private explorerService: ExplorerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {

    console.log('ctor');
  }

  ngOnInit() {
    console.log('init');
    
    this.route.queryParams.pipe(
      switchMap(params => {
        return this.explorerService.getPlaceById$(params['placeId'])
      })
    ).subscribe(item => {
      if (item) {
        this.selectedItem = item;
        console.log('item', this.selectedItem);
      }
      
    });
  }
  onScreenBoundChange(bounds: LngLatBounds) {
    this.currentBounds = bounds;
    console.log('bound change');
    
    this.placesInBounds$ = this.explorerService.getPlacesInBounds$(bounds);
  }

  onItemSelected(item: any) {
    this.selectedItem = item;
    this.showingPlaces = false;
    
    // this.loadPlace(item.id)
    this.router.navigate(['/explore', item.id], { relativeTo: this.route });
  }

  toggleView(){
    this.showingPlaces = true;
    console.log('toggle view');
    
    this.placesInBounds$ = this.explorerService.getPlacesInBounds$(this.currentBounds);
  }

  private loadPlace(place: Place) {
    this.photosFromPlace$ = this.explorerService.getPhotosCollection(place).pipe(
      map(photo => convertSnaps(photo))
    );
    this.placesInBounds$ = this.photosFromPlace$;
  }
}
