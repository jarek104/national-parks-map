import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './views/profile/profile.component';
import { SettingsComponent } from './views/settings/settings.component';
import { UploadsComponent } from './views/uploads/uploads.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'places', loadChildren: () => import('../app/views/places/places.module').then(m => m.PlacesModule)},
  { path: 'photos', loadChildren: () => import('../app/views/photos/photos.module').then(m => m.PhotosModule)},
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
