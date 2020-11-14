import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from './../../shared/modules/material.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadsComponent } from './uploads.component';

const routes: Routes = [
  { path: '', component: UploadsComponent },
];

@NgModule({
  declarations: [
    UploadsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    UploadsComponent,
  ]
})
export class UploadsModule {
}
