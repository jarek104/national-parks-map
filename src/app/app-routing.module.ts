import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ProfileComponent } from './views/profile/profile.component';
import { SettingsComponent } from './views/settings/settings.component';

const routes: Routes = [
  { path: 'explorer', loadChildren: () => import('../app/views/explorer/explorer.module').then(m => m.ExplorerModule)},
  { path: 'places', loadChildren: () => import('../app/views/places/places.module').then(m => m.PlacesModule)},
  { path: 'photos', loadChildren: () => import('../app/views/photos/photos.module').then(m => m.PhotosModule)},
  { path: 'uploads', loadChildren: () => import('../app/views/uploads/uploads.module').then(m => m.UploadsModule)},
  { path: '', loadChildren: () => import('../app/views/home/home.module').then(m => m.HomeModule)},
  { path: 'settings', component: SettingsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
