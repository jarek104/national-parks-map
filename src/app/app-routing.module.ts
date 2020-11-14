import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { NgModule } from '@angular/core';
import { PhotoListComponent } from './shared/components/photo-list/photo-list.component';
import { PhotoPreviewListComponent } from './shared/components/photo-preview-list/photo-preview-list.component';
import { PlaceDetailsComponent } from './shared/components/place-details/place-details.component';
import { PlaceListComponent } from './shared/components/place-list/place-list.component';
import { ProfileComponent } from './views/profile/profile.component';
import { SettingsComponent } from './views/settings/settings.component';
import { UploadsComponent } from './views/uploads/uploads.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'places', loadChildren: () => import('../app/views/places/places.module').then(m => m.PlacesModule)},
  // { path: 'photos', loadChildren: () => import('../app/views/photos/photos.module').then(m => m.PhotosModule)},
  // { path: 'places', component: PlaceListComponent },
  // { path: 'places/:placeId', component: PlaceDetailsComponent },
  { path: 'photos', component: PhotoListComponent },
  { path: 'photos/:photoId', component: PhotoListComponent },
  { path: 'uploads', component: UploadsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/places', pathMatch: 'full' },
  { path: '**', redirectTo: '/places' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
