import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';

import { CarouselComponent } from 'src/app/shared/components/carousel/carousel.component';
import { ExplorerService } from './../../shared/services/explorer.service';
import { PanelViewMode } from './../../models/exploration';
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
  currentBounds$ = this.explorerService.currentBounds$;
  explorationMode$ = this.explorerService.explorationMode$.asObservable();
  panelViewMode$ = new BehaviorSubject<PanelViewMode | undefined>(undefined);
  
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
      item ? this.onItemSelected(item) : this._resetView();
    });

    this.explorerService.currentBounds$.subscribe(value => console.log('new', value));
    
    this.pinsInBounds$ = this.explorerService.currentBounds$.pipe(
      switchMap(bounds => {
        return this.explorerService.getPlacesInBounds$(bounds);
      })
    );
    // this.pinsInBounds$ = combineLatest([
    //   this.explorerService.currentBounds$,
    //   this.explorationMode$,
    //   this.panelViewMode$
    // ])
  }
  
  onItemSelected(item: any) {
    this.selectedItem = item;  
    this.panelViewMode$.next(PanelViewMode.PlaceDetails);  
    this.pinsInBounds$ = this.explorerService.getPlacePhotosCollection(item).pipe(
      map(photo => convertSnaps(photo))
    );
  }
  
  onItemHovered(item: any) {
    this.highlightedItem = item;
  }

  onBackClicked(){
    this._resetView();
    
    this.pinsInBounds$ = this.explorerService.getPlacesInBounds$(this.currentBounds$.value);
  }

  private _resetView() {
    this.router.navigate(['explore', '_']);
    this.panelViewMode$.next(PanelViewMode.PlacesList);
  }
}
