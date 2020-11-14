import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';

import { CarouselComponent } from 'src/app/shared/components/carousel/carousel.component';
import { ExplorerService } from './../../shared/services/explorer.service';
import { Observable } from 'rxjs';
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
  }
  
  onItemSelected(item: any) {
    this.selectedItem = item;  
    this.pinsInBounds$ = this.explorerService.getPhotosByPlace$(item).pipe(
      map(photo => convertSnaps(photo))
    );
  }
  
  onItemHovered(item: any) {
    this.highlightedItem = item;
  }

  onBackClicked(){
    this._resetView();
    
    this.pinsInBounds$ = this.explorerService.getPlacesInBounds$();
  }

  private _resetView() {
    this.router.navigate(['explore', '_']);
  }
}
