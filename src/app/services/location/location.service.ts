import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private db: AngularFirestore) { }

  getLocations() {
    return this.db
      .collectionGroup('posts', ref =>
        ref
          .where('visibility', '==', 'public')
          .where('location.visible', '==', true)
          .orderBy('timestamp', 'desc')
          .limit(20))
      .valueChanges();
  }
}
