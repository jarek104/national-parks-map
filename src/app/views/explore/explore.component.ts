import { ExplorerService } from './../../shared/services/explorer.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Place } from 'src/app/models/place';
import { CarouselComponent } from 'src/app/shared/components/carousel/carousel.component';
import Carousel from 'src/app/shared/components/carousel/carousel';

@Component({
  selector: 'sp-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  @ViewChild(CarouselComponent) carousel: CarouselComponent;

  places: Place[] = [];
  placesInBounds = new BehaviorSubject<Place[]>([]);
  activePlaceIndex: Observable<number>;

  constructor(
    private explorerService: ExplorerService
  ) {

  }
  ngOnInit(): void {
    this.activePlaceIndex = this.explorerService.activePlaceIndex;
    this.explorerService.getFilteredPlaces().subscribe(data => {
      this.places = data;
    });
  }

  onSlideChange(carousel: Carousel) {
    this.explorerService.activePlaceIndex.next(carousel.activeIndex);
  }
  onScreenBoundChange(bounds: mapboxgl.LngLatBounds) {
    const tempArray = [];
    this.places.map((place: Place) => {
      if (this.inBounds(place, bounds)) {
        tempArray.push(place);
      }
    });
    this.placesInBounds.next(tempArray);
    if (this.carousel) {
      this.carousel.slideTo(0);
    }
  }
  onPreviewClick(place: Place) {
    console.log(place);
  }
  private inBounds(place: Place, bounds) {
    const lng = (place.longitude - bounds._ne.lng) * (place.longitude - bounds._sw.lng) < 0;
    const lat = (place.lattitude - bounds._ne.lat) * (place.lattitude - bounds._sw.lat) < 0;
    return lng && lat;
  }
}
