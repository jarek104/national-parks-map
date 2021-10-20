import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import { ExplorerService } from 'src/app/shared/services/explorer.service';
import { LngLat } from 'mapbox-gl';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Photo } from './../../../models/photo';
import { User } from 'src/app/models/user';

@Component({
  selector: 'sp-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss']
})
export class PhotoDetailsComponent implements OnInit {
  photo$?: Observable<Photo>;
  author$?: Observable<User>

  constructor(
    private route: ActivatedRoute,
    private explorerService: ExplorerService,
    private location: Location
  ) { }

  ngOnInit() {
    this.explorerService.lastPinsInBounds$.next(this.explorerService.pinsInBounds$.value);
    

    this.photo$ = this.route.params.pipe(
      switchMap(params => this.explorerService.getPhotoById$(params['photoId'])),
      tap(photo => {
        let pin = new LngLat(Number(photo.geopoint.longitude), Number(photo.geopoint.latitude));
        this.explorerService.goToPoint$.next(pin)
      })
    );
  }

  onBackClick() {
    this.location.back();
  }

  onFavoritesClick() {

  }

}
