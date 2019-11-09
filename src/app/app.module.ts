import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirePerformanceModule } from '@angular/fire/performance';

import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './components/profile/user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material-module/material-module.module';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    HomeComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      // Google Maps API Key
      apiKey: 'AIzaSyADNcOBV1r533yDUvFqivkewARQk_CNb2g'
    }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFirePerformanceModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
