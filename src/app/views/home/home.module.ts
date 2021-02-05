import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeToolbarComponent } from './home-toolbar/home-toolbar.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { NgModule } from '@angular/core';
import { HomeFeatureItemComponent } from './home-feature-item/home-feature-item.component';
import { HomeFooterComponent } from './home-footer/home-footer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [
    HomeComponent,
    HomeToolbarComponent,
    HomeFeatureItemComponent,
    HomeFooterComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
