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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MapContainerComponent } from './shared/components/map-container/map-container.component';
import { MapService } from 'ngx-mapbox-gl';
import { MaterialModule } from './shared/modules/material.module';
import { NgModule } from '@angular/core';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { ProfileComponent } from './views/profile/profile.component';
import { SettingsComponent } from './views/settings/settings.component';
import { SharedModule } from './shared/modules/shared.module';
import { UploadsModule } from './views/uploads/uploads.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AppTabsComponent,
    AppSidenavComponent,
    MapContainerComponent,
    ProfileComponent,
    SettingsComponent,
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
    UploadsModule,
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/custom-icons.svg'));
  }
}
