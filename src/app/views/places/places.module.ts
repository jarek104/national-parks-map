import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MaterialModule } from './../../shared/modules/material.module';
import { NgModule } from '@angular/core';
import { PhotoListComponent } from 'src/app/shared/components/photo-list/photo-list.component';
import { PhotoPreviewListComponent } from 'src/app/shared/components/photo-preview-list/photo-preview-list.component';
import { PlaceDetailsComponent } from 'src/app/shared/components/place-details/place-details.component';
import { PlaceListComponent } from 'src/app/shared/components/place-list/place-list.component';
import { PlacesComponent } from './places.component';
import { SharedModule } from './../../shared/modules/shared.module';

const routes: Routes = [
  { path: '', component: PlaceListComponent },
  { path: ':placeId', component: PlaceDetailsComponent },
];

@NgModule({
  declarations: [
    PlacesComponent,
    PlaceDetailsComponent,
    PlaceListComponent,
    PhotoPreviewListComponent,
    PhotoListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [
    PlacesComponent,
  ]
})
export class PlacesModule {
}
