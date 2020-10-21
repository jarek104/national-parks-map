import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Place } from 'src/app/models/place';

@Component({
  selector: 'app-place-list-item',
  templateUrl: './place-list-item.component.html',
  styleUrls: ['./place-list-item.component.scss']
})
export class PlaceListItemComponent implements OnInit {

  @Input() place?: Place;
  @Output() itemSelected = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }
  itemClicked() {
    this.itemSelected.emit(this.place);
  }

}
