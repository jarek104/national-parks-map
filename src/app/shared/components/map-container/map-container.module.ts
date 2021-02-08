import { CommonModule } from '@angular/common';
import { MapContainerComponent } from './map-container.component';
import { NgModule } from '@angular/core';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { SharedModule } from './../../modules/shared.module';

@NgModule({
  declarations: [
    MapContainerComponent,
  ],
  imports: [
    NgxMapboxGLModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    MapContainerComponent,
  ],
})
export class MapContainerModule { }
