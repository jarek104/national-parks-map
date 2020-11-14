import { CommonModule } from '@angular/common';
import { ExploreComponent } from './explore.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgModule } from '@angular/core';
import { PhotoListComponent } from 'src/app/shared/components/photo-list/photo-list.component';
import { PhotoPreviewListComponent } from 'src/app/shared/components/photo-preview-list/photo-preview-list.component';
import { PlaceDetailsComponent } from 'src/app/shared/components/place-details/place-details.component';
import { PlaceListComponent } from 'src/app/shared/components/place-list/place-list.component';
import { SharedModule } from './../../shared/modules/shared.module';

@NgModule({
  declarations: [
    ExploreComponent,
    PlaceDetailsComponent,
    PlaceListComponent,
    PhotoPreviewListComponent,
    PhotoListComponent,
  ],
  imports: [
    CommonModule,
    MatButtonToggleModule
  ],
  exports: [
    ExploreComponent,
  ]
})
export class ExploreModule {
}
