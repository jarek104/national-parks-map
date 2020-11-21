import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { SharedModule } from './../../shared/modules/shared.module';

const routes: Routes = [
  { path: '', component: PhotoListComponent },
  { path: ':photoId', component: PhotoListComponent },
];

@NgModule({
  declarations: [
    PhotoListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [
    PhotoListComponent,
  ]
})
export class PhotosModule {
}
