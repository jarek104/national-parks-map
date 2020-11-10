import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ExplorerService } from './../../services/explorer.service';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/models/photo';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

  photos$?: Observable<Photo[]>;

  constructor(
    private explorerService: ExplorerService,
  ) { }

  ngOnInit(): void {    
    this.photos$ = this.explorerService.currentBounds$.pipe(
      switchMap(_ => this.explorerService.getPhotosInBounds$()),
    );
    
  }

  onItemHover(item: Photo) {
    
  }

}
