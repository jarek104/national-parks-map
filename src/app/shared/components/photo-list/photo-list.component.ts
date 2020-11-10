import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';

import { ExplorerService } from './../../services/explorer.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Photo } from 'src/app/models/photo';
import { Tag } from 'src/app/models/tag';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {
  
  tagKeys = Object.keys(Tag);
  tags = Tag;
  currentFilters$ = this.explorerService.currentPhotoFilters$;

  photos$?: Observable<Photo[]>;

  constructor(
    private explorerService: ExplorerService,
  ) { }

  ngOnInit(): void {    

    this.photos$ = combineLatest([
      this.explorerService.currentBounds$,
      this.explorerService.currentPhotoFilters$,
    ]).pipe(
      switchMap(_ => this.explorerService.getPhotosInBounds$()),
    );
    
  }

  onItemHover(item: Photo) {
    
  }

  onFilterChange(change: MatButtonToggleChange) {
    console.log(change.value);
    
    this.explorerService.currentPhotoFilters$.next(change.value);
  }

}
