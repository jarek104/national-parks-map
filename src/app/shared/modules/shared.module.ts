import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ImageUrlPipe } from '../pipes/image-url.pipe';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ImageUrlPipe,
  ],
  imports: [
    NgxMapboxGLModule
  ],
  exports: [
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ImageUrlPipe,
    CommonModule
  ],
})
export class SharedModule { }
