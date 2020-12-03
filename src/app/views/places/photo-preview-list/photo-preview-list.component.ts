import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ExplorerService } from 'src/app/shared/services/explorer.service';
import { Photo } from 'src/app/models/photo';
import { Place } from 'src/app/models/place';

@Component({
  selector: 'app-photo-preview-list',
  templateUrl: './photo-preview-list.component.html',
  styleUrls: ['./photo-preview-list.component.scss']
})
export class PhotoPreviewListComponent {
  @Input() items: Photo[] | Place[];
  @Output() clicked = new EventEmitter();

  constructor(
    private explorerService: ExplorerService,
  ) {}

  onItemHover(item?: Place) {    
    item ? this.explorerService.highlightedItem$.next(item) : this.explorerService.highlightedItem$.next(undefined)
  }

  onClick(item: Place) {
    this.clicked.emit(item);
  }

  isActive(item: Place | Photo) {
    return this.explorerService.highlightedItem$.value?.id === item.id;
  }

}
