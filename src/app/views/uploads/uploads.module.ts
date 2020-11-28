import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../shared/modules/material.module';
import { NgModule } from '@angular/core';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { PlaceFormComponent } from './place-form/place-form.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'photo', component: PhotoFormComponent },
  { path: 'photo:id', component: PhotoFormComponent },
  { path: 'place', component: PlaceFormComponent },
  { path: 'place:id', component: PlaceFormComponent },
];

@NgModule({
  declarations: [
    PlaceFormComponent,
    PhotoFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
})
export class UploadsModule {
}
