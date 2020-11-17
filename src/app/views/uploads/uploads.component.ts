import { Component, OnInit } from '@angular/core';

import { ExplorerService } from 'src/app/shared/services/explorer.service';
import { Place } from 'src/app/models/place';
import { UploadService } from './../../shared/services/upload.service';

@Component({
  selector: 'sp-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit {

  selectedPlace?: Place;
  photoFile?: File;

  places = [];
  

  

  

  constructor(
    private explorerService: ExplorerService,
    private uploadService: UploadService,
  ) { }

  ngOnInit() {
    this.explorerService.pinsInBounds$.next([]);

    

    this.uploadService.draggablePin$.next(this.uploadService.boundsCenter$.value);

    
    
  }

  
  
  
  
}
