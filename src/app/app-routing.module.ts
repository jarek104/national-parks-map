import { HistoryComponent } from './views/history/history.component';
import { SettingsComponent } from './views/settings/settings.component';
import { LeaderboardComponent } from './views/leaderboard/leaderboard.component';
import { BucketListsComponent } from './views/bucket-lists/bucket-lists.component';
import { FavoritesComponent } from './views/favorites/favorites.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { ExploreComponent } from './views/explore/explore.component';
import { ProfileComponent } from './views/profile/profile.component';
import { TrendingComponent } from './views/trending/trending.component';
import { UploadsComponent } from './views/uploads/uploads.component';
import { PlaceDetailsComponent } from './views/place-details/place-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'bucket-lists', component: BucketListsComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'trending', component: TrendingComponent },
  { path: 'uploads', component: UploadsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'place-details/:id', component: PlaceDetailsComponent },
  { path: '', redirectTo: '/explore', pathMatch: 'full' },
  { path: '**', redirectTo: '/explore' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
