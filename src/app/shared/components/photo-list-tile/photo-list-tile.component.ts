import { Component, Input, OnInit } from '@angular/core';

import { Photo } from 'src/app/models/photo';

@Component({
  selector: 'sp-photo-list-tile',
  templateUrl: './photo-list-tile.component.html',
  styleUrls: ['./photo-list-tile.component.scss']
})
export class PhotoListTileComponent implements OnInit {

  @Input() photo?: Photo;

  constructor() { }

  ngOnInit() {
    // console.log('init', this.photo);

  }

}
