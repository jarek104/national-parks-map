import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapService } from 'ngx-mapbox-gl';


import { MaterialModule } from './shared/modules/material.module';
import { SharedModule } from './shared/modules/shared.module';
import { LoginComponent } from './views/login/login.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { AppToolbarComponent } from './shared/components/app-toolbar/app-toolbar.component';
import { AppTabsComponent } from './shared/components/app-tabs/app-tabs.component';
import { AppSidenavComponent } from './shared/components/app-sidenav/app-sidenav.component';
import { MapContainerComponent } from './shared/components/map-container/map-container.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { ExploreComponent } from './views/explore/explore.component';
import { TrendingComponent } from './views/trending/trending.component';
import { FavoritesComponent } from './views/favorites/favorites.component';
import { ProfileComponent } from './views/profile/profile.component';
import { BucketListsComponent } from './views/bucket-lists/bucket-lists.component';
import { UploadsComponent } from './views/uploads/uploads.component';
import { HistoryComponent } from './views/history/history.component';
import { LeaderboardComponent } from './views/leaderboard/leaderboard.component';
import { SettingsComponent } from './views/settings/settings.component';
import { PhotoListTileComponent } from './shared/components/photo-list-tile/photo-list-tile.component';
import { PlaceDetailsComponent } from './views/place-details/place-details.component';
import { CarouselModule } from './shared/components/carousel/carousel.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppToolbarComponent,
    AppTabsComponent,
    AppSidenavComponent,
    MapContainerComponent,
    ExploreComponent,
    TrendingComponent,
    FavoritesComponent,
    ProfileComponent,
    BucketListsComponent,
    UploadsComponent,
    HistoryComponent,
    LeaderboardComponent,
    SettingsComponent,
    PhotoListTileComponent,
    PlaceDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoiamFyZWsxMDQiLCJhIjoiY2pxeDA4ZnhpMWJwbjQzbWgxMmRvc2JoaSJ9.6KUAqjYXUmAbUpnKT32u8Q',
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatIconModule,
    HttpClientModule,
    CarouselModule,
    SharedModule,
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/custom-icons.svg'));
  }
}
