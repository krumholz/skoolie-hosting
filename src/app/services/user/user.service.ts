import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userId: string;
  user: {};
  coords$: Observable<any>;

  constructor(
    private db: AngularFirestore,
    private afs: AngularFirestore,
    public authService: AuthService
    ) {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.user = user;
      }
    });
  }

  getPostsByLocation() {
    return this.db
      .collectionGroup('posts', ref =>
        ref
          .where('visibility', '==', 'public')
          .where('location.visible', '==', true)
          .orderBy('timestamp', 'desc')
          .limit(20))
      .valueChanges();
  }

  getCurrentLocation() {
    if (!this.userId) { return; }
    return this.db
      .collection(`users/${this.userId}/locations`, ref =>
        ref
          .orderBy('timestamp', 'desc')
          .limit(1))
      .valueChanges();
  }

  getFriendsCurrentLocations() {
    if (!this.userId) { return; }
    return this.db
      .collectionGroup('shared', ref =>
        ref
          .where('friend.uid', '==', `${this.userId}`)
          .where('visible', '==', true)
          .limit(20))
      .valueChanges();
  }

  getPosition = (options) => {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    } else {
      return new Promise(
        reject => reject('Your browser does not support geolocation.')
      );
    }
  }

  async saveLocation(location) {
    if (!this.user) { return; }
    const locationRef = this.afs
      .collection(`users/${this.userId}/locations/`);

    const data = {
      user: this.user,
      location,
      visibility: 'hidden',
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    console.log(data);
    return locationRef.add(data);
  }
}
