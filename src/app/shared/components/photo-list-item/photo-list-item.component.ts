import { Component, Input, OnInit } from '@angular/core';

import { Photo } from 'src/app/models/photo';

@Component({
  selector: 'app-photo-list-item',
  templateUrl: './photo-list-item.component.html',
  styleUrls: ['./photo-list-item.component.scss']
})
export class PhotoListItemComponent implements OnInit {

  @Input() photo?: Photo;

  constructor() { }

  ngOnInit(): void {
    console.log('photo', this.photo);

  }

}
