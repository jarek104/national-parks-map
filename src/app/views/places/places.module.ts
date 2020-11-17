import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PhotoPreviewListComponent } from './photo-preview-list/photo-preview-list.component';
import { PlaceDetailsComponent } from './place-details/place-details.component';
import { PlaceListComponent } from './place-list/place-list.component';
import { SharedModule } from './../../shared/modules/shared.module';

const routes: Routes = [
  { path: '', component: PlaceListComponent },
  { path: ':placeId', component: PlaceDetailsComponent },
];

@NgModule({
  declarations: [
    PlaceDetailsComponent,
    PlaceListComponent,
    PhotoPreviewListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class PlacesModule {
}
