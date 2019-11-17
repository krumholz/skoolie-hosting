import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirePerformanceModule } from '@angular/fire/performance';

import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AgmOverlays } from 'agm-overlays';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './components/profile/user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material-module/material-module.module';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { DocumentationComponent } from './components/documentation/documentation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    UserProfileComponent,
    DocumentationComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      // Google Maps API Key
      apiKey: 'AIzaSyADNcOBV1r533yDUvFqivkewARQk_CNb2g'
    }),
    AgmJsMarkerClustererModule,
    AgmOverlays,
    AgmSnazzyInfoWindowModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFirePerformanceModule,
    AngularFireStorageModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
