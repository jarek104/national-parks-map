import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ImageUrlPipe } from '../pipes/image-url.pipe';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ImageUrlPipe,
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ImageUrlPipe,
  ],
})
export class SharedModule { }
