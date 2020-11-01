import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Place } from 'src/app/models/place';
import { PlaceService } from '../../services/place.service';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss']
})
export class PlaceListComponent implements OnInit {
  @Input() places?: Place[];
  @Input() active?: Place;
  @Output() itemClicked = new EventEmitter();
  @Output() itemHovered = new EventEmitter();
  hoveredItem?: Place;
  coverPhotoUrl?: string;

  constructor(
    private placeService: PlaceService, 
  ) { }

  ngOnInit(): void {}

  onItemClicked(item: Place) {
    this.itemClicked.emit(item)    
  }

  onItemHover(item?: Place) {    
    item ? this.itemHovered.emit(item) : this.itemHovered.emit(undefined);
  }

  getCoverPhoto(place: Place) {
    // return this.placeService.getCoverPhotoUrl(place);
  }

}
