import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

@NgModule({
  exports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
  ],
})
export class SharedModule { }
