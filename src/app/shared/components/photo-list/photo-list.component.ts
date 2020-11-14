import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

import { ExplorerService } from './../../services/explorer.service';
import { LngLatBounds } from 'mapbox-gl';
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

  photos$ = new BehaviorSubject<Photo[]>([]);
  photosInBounds$?: Observable<Photo[]>;

  constructor(
    public explorerService: ExplorerService,
  ) { }

  ngOnInit(): void {    
    
    combineLatest([
      this.explorerService.currentBounds$,
      this.explorerService.currentPhotoFilters$,
    ]).subscribe(_ => this.photos$.next(this.explorerService.getPhotosInBounds()));
  }
  

  onItemHover(item: Photo) {
    
  }

  onFilterChange(change: MatButtonToggleChange) {
    this.explorerService.currentPhotoFilters$.next(change.value);
  }

}
