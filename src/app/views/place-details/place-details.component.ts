import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Photo } from 'src/app/models/photo';
import { Place } from 'src/app/models/place';

@Component({
  selector: 'sp-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent implements OnInit {
  demo = "url(\"https://www.discovernorthamerica.co.uk/wp-content/uploads/2018/10/monument-valley-1081996_960_720.jpg\")";

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
    console.log(this.photos);
    console.log('add/remove photo from favorites');
  }

}
