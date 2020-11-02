import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Photo } from 'src/app/models/photo';
import { Place } from 'src/app/models/place';

@Component({
  selector: 'sp-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent implements OnInit {

  @Output() backClicked = new EventEmitter();
  @Input() place?: Place;
  @Input() photos?: Photo[];

  constructor() { }

  ngOnInit() {
  }
  onBackClick() {
    this.backClicked.emit();
  }
  onFavoritesClick() {
    console.log('add/remove photo from favorites');
  }

  toggleDescriptionView() {
    
  }

}
