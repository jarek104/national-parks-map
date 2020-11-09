import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, forkJoin, of } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ExplorationMode, PanelViewMode } from './../../models/exploration';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

import { CarouselComponent } from 'src/app/shared/components/carousel/carousel.component';
import { ExplorerService } from './../../shared/services/explorer.service';
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
      console.log('item select from route');
      
      item ? this.onItemSelected(item) : this._resetView();
    });
    
    // this works
    // this.pinsInBounds$ = this.explorerService.currentBounds$.pipe(
    //   switchMap(bounds => {
    //     return this.explorerService.getPlacesInBounds$(bounds);
    //   })
    // );


    // this doesn't work right
    this.pinsInBounds$ = combineLatest([
      this.explorerService.currentBounds$,
      this.explorationMode$,
      this.panelViewMode$
    ]).pipe(
      switchMap(([bounds, explorationMode, panelMode]) => {
        if (bounds && explorationMode !== undefined && panelMode !== undefined) {
          console.log('here', bounds, explorationMode, ExplorationMode.places, panelMode);

          if (explorationMode === ExplorationMode.places) {
            // this.panelViewMode$.next(PanelViewMode.PlacesList);
            console.log('getting places in bounds');
            
            return this.explorerService.getPlacesInBounds$(bounds);
          } else {
            // this.panelViewMode$.next(PanelViewMode.PhotosList);
            return this.explorerService.getPhotosInBounds$(bounds);
          }
        } else {
          return of(undefined);
        }
      })
    )
    
    // subscribe(([bounds, explorationMode, panelMode]) => {
    //   if (bounds && explorationMode && panelMode !== undefined) {
    //     console.log('here', bounds, explorationMode, panelMode);
    //     if (explorationMode === ExplorationMode.places) {

    //     }
    //   }
    // });
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
