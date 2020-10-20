import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap, mergeMap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { Place } from 'src/app/models/place';
import { PlaceService } from 'src/app/shared/services/place.service';
import { Photo } from 'src/app/models/photo';

import { Location } from '@angular/common';
import { User } from '../../models/user';

@Component({
  selector: 'sp-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent implements OnInit {

  place$: Observable<Place>;
  currentPhoto: Photo;
  currentPhotoAuthor: User;
  alternativePhotos: Photo[] = [];

  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService,
    private location: Location
  ) { }

  ngOnInit() {
    this.place$ = this.route.params.pipe(
      switchMap(params => {
        return this.placeService.getPlaceDetails(params.id);
      }),
      // tap(place => this.currentPhoto = place.coverPhoto)
    );
    this.place$.pipe(
      mergeMap((place: Place) => {
        return forkJoin(
          // this.placeService.getAuthor(place.coverPhoto.authorId),
          this.placeService.getAlternativePhotos(place.photoIds)
        );
      })
    ).subscribe(([photos]) => {
      // this.currentPhotoAuthor = author;
      this.alternativePhotos = photos;

    });
  }
  onBackClick() {
    this.location.back();
  }
  onFavoritesClick(photo: Photo) {
    console.log('add/remove photo from favorites', photo);
  }

}
