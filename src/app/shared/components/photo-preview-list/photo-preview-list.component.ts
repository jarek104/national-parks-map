import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ExplorerService } from './../../services/explorer.service';
import { Photo } from 'src/app/models/photo';

@Component({
  selector: 'app-photo-preview-list',
  templateUrl: './photo-preview-list.component.html',
  styleUrls: ['./photo-preview-list.component.scss']
})
export class PhotoPreviewListComponent implements OnInit {
  photos = [];

  constructor(
    private explorerService: ExplorerService,
  ) {}

  ngOnInit() {
    // this.explorerService.pinsInBounds$.next([]);
  }

  onItemClicked(item: Photo) {
    // this.itemClicked.emit(item)    
  }

  onItemHover(item?: Photo) {    
    // item ? this.itemHovered.emit(item) : this.itemHovered.emit(undefined);
  }

}
