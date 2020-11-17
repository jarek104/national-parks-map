import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import { ExplorerService } from 'src/app/shared/services/explorer.service';
import { Observable } from 'rxjs';
import { Photo } from './../../../models/photo';
import { Place } from 'src/app/models/place';

@Component({
  selector: 'sp-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent implements OnInit {
  place$?: Observable<Place>;
  photos$?: Observable<Photo[]>;

  constructor(
    private route: ActivatedRoute,
    private explorerService: ExplorerService,
  ) { }

  ngOnInit() {
    this.explorerService.lastPinsInBounds$.next(this.explorerService.pinsInBounds$.value);
    this.place$ = this.route.params.pipe(
      switchMap(params => this.explorerService.getPlaceById$(params['placeId']))
    );

    this.photos$ = this.place$.pipe(
      switchMap(place => this.explorerService.getPhotosByPlace$(place)),
      tap(photos => {
        this.explorerService.pinsInBounds$.next(photos);
        this.explorerService.fitItemsToBounds$.next(photos);
      })
    );
  }

  ngOnDestroy() {
    console.log('destroy');
    
    this.explorerService.fitItemsToBounds$.next(this.explorerService.lastPinsInBounds$.value);
  }

  onFavoritesClick() {
    console.log('add/remove photo from favorites');
  }

  onItemHovered(photo: Photo) {    
    this.explorerService.highlightedItem$.next(photo);
  }

  toggleDescriptionView() {
    
  }

}
