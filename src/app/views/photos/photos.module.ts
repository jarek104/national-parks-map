import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { SharedModule } from './../../shared/modules/shared.module';

const routes: Routes = [
  { path: '', component: PhotoListComponent },
  { path: ':photoId', component: PhotoDetailsComponent },
];

@NgModule({
  declarations: [
    PhotoListComponent,
    PhotoDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class PhotosModule {
}
