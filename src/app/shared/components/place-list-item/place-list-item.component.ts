import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-place-list-item',
  templateUrl: './place-list-item.component.html',
  styleUrls: ['./place-list-item.component.scss']
})
export class PlaceListItemComponent implements OnInit {

  @Input() place?: any;
  @Output() itemSelected = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }
  itemClicked() {
    this.itemSelected.emit(this.place);
  }

}
