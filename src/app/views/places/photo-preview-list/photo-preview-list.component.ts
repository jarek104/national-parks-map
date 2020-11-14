import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ExplorerService } from 'src/app/shared/services/explorer.service';
import { Photo } from 'src/app/models/photo';

@Component({
  selector: 'app-photo-preview-list',
  templateUrl: './photo-preview-list.component.html',
  styleUrls: ['./photo-preview-list.component.scss']
})
export class PhotoPreviewListComponent implements OnInit {
  @Input() photos: Photo[];

  constructor(
    private explorerService: ExplorerService,
  ) {}

  ngOnInit() {
  }

  onItemClicked(item: Photo) {
    // this.itemClicked.emit(item)    
  }

  onItemHover(item?: Photo) {    
    item ? this.explorerService.highlightedItem$.next(item) : this.explorerService.highlightedItem$.next(undefined)
  }

}
