import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

import { ExplorerService } from 'src/app/shared/services/explorer.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Photo } from 'src/app/models/photo';
import { Tag } from 'src/app/models/tag';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {
  
  tagKeys = Object.keys(Tag);
  tags = Tag;
  currentFilters$ = this.explorerService.currentPhotoFilters$;

  photos$: Observable<Photo[]>;
  photosInBounds$?: Observable<Photo[]>;

  constructor(
    public explorerService: ExplorerService,
  ) { }

  ngOnInit(): void {    
    this.photos$ = combineLatest([
      this.explorerService.currentBounds$,
      this.explorerService.currentPhotoFilters$,
    ]).pipe(
      debounceTime(200),
      switchMap(_ => this.explorerService.getPhotosInBounds$())
    );

  }
  

  onItemHover(item: Photo) {
    
  }

  onFilterChange(change: MatButtonToggleChange) {
    this.explorerService.currentPhotoFilters$.next(change.value);
  }

}
