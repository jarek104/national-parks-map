import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ExplorerComponent } from './explorer.component';
import { MapContainerModule } from './../../shared/components/map-container/map-container.module';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/modules/shared.module';

const routes: Routes = [
  { path: '', component: ExplorerComponent },
  // { path: ':placeId', component: PlaceDetailsComponent },
];

@NgModule({
  declarations: [
    ExplorerComponent,
  ],
  imports: [
    MapContainerModule,
    RouterModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class ExplorerModule {
}
