import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppSidenavComponent } from './shared/components/app-sidenav/app-sidenav.component';
import { AppTabsComponent } from './shared/components/app-tabs/app-tabs.component';
import { AppToolbarComponent } from './shared/components/app-toolbar/app-toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExploreComponent } from './views/explore/explore.component';
import { GenerateModule } from './shared/components/generate/generate.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './views/login/login.component';
import { MapContainerComponent } from './shared/components/map-container/map-container.component';
import { MapService } from 'ngx-mapbox-gl';
import { MaterialModule } from './shared/modules/material.module';
import { NgModule } from '@angular/core';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { PhotoPreviewListComponent } from './shared/components/photo-preview-list/photo-preview-list.component';
import { PlaceDetailsComponent } from './shared/components/place-details/place-details.component';
import { PlaceListComponent } from './shared/components/place-list/place-list.component';
import { ProfileComponent } from './views/profile/profile.component';
import { SettingsComponent } from './views/settings/settings.component';
import { SharedModule } from './shared/modules/shared.module';
import { UploadsComponent } from './views/uploads/uploads.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppToolbarComponent,
    AppTabsComponent,
    AppSidenavComponent,
    MapContainerComponent,
    ExploreComponent,
    ProfileComponent,
    UploadsComponent,
    SettingsComponent,
    PlaceDetailsComponent,
    PlaceListComponent,
    PhotoPreviewListComponent,
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
    HttpClientModule,
    SharedModule,
    GenerateModule,
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/custom-icons.svg'));
  }
}
