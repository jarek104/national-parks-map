import { RouterModule, Routes } from '@angular/router';

import { ExploreComponent } from './views/explore/explore.component';
import { LoginComponent } from './views/login/login.component';
import { NgModule } from '@angular/core';
import { PlaceDetailsComponent } from './shared/components/place-details/place-details.component';
import { ProfileComponent } from './views/profile/profile.component';
import { SettingsComponent } from './views/settings/settings.component';
import { UploadsComponent } from './views/uploads/uploads.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'explore/:placeId', component: ExploreComponent },
  { path: 'uploads', component: UploadsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/explore/_', pathMatch: 'full' },
  { path: '**', redirectTo: '/explore/_' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
