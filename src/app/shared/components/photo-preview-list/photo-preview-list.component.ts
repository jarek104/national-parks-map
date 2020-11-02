import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Photo } from 'src/app/models/photo';

@Component({
  selector: 'app-photo-preview-list',
  templateUrl: './photo-preview-list.component.html',
  styleUrls: ['./photo-preview-list.component.scss']
})
export class PhotoPreviewListComponent {

  @Input() photos?: Photo[];
  @Input() active?: Photo;
  @Output() itemClicked = new EventEmitter();
  @Output() itemHovered = new EventEmitter();

  onItemClicked(item: Photo) {
    this.itemClicked.emit(item)    
  }

  onItemHover(item?: Photo) {    
    item ? this.itemHovered.emit(item) : this.itemHovered.emit(undefined);
  }

}
