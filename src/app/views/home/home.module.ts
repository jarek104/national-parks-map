import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeFeatureItemComponent } from './home-feature-item/home-feature-item.component';
import { HomeFooterComponent } from './home-footer/home-footer.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/modules/shared.module';

const routes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [
    HomeComponent,
    HomeFeatureItemComponent,
    HomeFooterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
