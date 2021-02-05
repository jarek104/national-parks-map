import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';

import { ExplorerService } from 'src/app/shared/services/explorer.service';
import { Observable } from 'rxjs';
import { Photo } from './../../../models/photo';
import { Place } from 'src/app/models/place';
import { UploadService } from 'src/app/shared/services/upload.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/services/user-data.service';

@Component({
  selector: 'sp-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent implements OnInit {
  place$?: Observable<Place>;
  photos$?: Observable<Photo[]>;
  author$?: Observable<User>

  constructor(
    private route: ActivatedRoute,
    private explorerService: ExplorerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.explorerService.lastPinsInBounds$.next(this.explorerService.pinsInBounds$.value);
    this.place$ = this.route.params.pipe(
      switchMap(params => this.explorerService.getPlaceById$(params['placeId']))
    );

    this.photos$ = this.place$.pipe(
      switchMap(place => this.explorerService.getPhotosByPlace$(place)),
      tap(photos => {
        // if (photos.length === 0) {
        //   photos.push([...this.place$.])
        // }
        this.explorerService.pinsInBounds$.next(photos);
        this.explorerService.fitItemsToBounds$.next(photos);
      })
    );
  }

  ngOnDestroy() {    
    this.explorerService.fitItemsToBounds$.next(this.explorerService.lastPinsInBounds$.value);
  }

  onFavoritesClick() {
    console.log('add/remove photo from favorites');
  }

  onItemsClicked(item: Place) {
    this.router.navigate(['photos', item.id])
  }

  toggleDescriptionView() {
    
  }

  onAuthorClick(place: Place) {
    window.open("https://nps.gov", "_blank");
  }

}
