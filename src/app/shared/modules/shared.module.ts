import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThumbnailUrlPipe } from 'src/app/views/photos/photo-list/thumbnailUrl.pipe';

@NgModule({
  declarations: [
    ThumbnailUrlPipe,
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ThumbnailUrlPipe,
  ],
})
export class SharedModule { }
