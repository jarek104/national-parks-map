import { ExplorerService } from './../../shared/services/explorer.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Place } from 'src/app/models/place';
import { CarouselComponent } from 'src/app/shared/components/carousel/carousel.component';
import { LngLatBounds } from 'mapbox-gl';

@Component({
  selector: 'sp-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  @ViewChild(CarouselComponent) carousel: CarouselComponent;

  placesInBounds$: Observable<any>;

  constructor(
    private explorerService: ExplorerService
  ) {}

  ngOnInit(): void {
    // this.activePlaceIndex = this.explorerService.activePlaceIndex;
    // this.explorerService.getFilteredPlaces().subscribe(data => {
    //   this.places = data;
    // });
  }
  onScreenBoundChange(bounds: LngLatBounds) {
    this.placesInBounds$ = this.explorerService.getPlacesInBounds$(bounds);
  }
}
