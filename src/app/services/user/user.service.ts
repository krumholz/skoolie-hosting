import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
// import * as firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userId: string;

  constructor(private db: AngularFirestore, public authService: AuthService) {
    this.authService.user$.subscribe(user => {
      if (user) { this.userId = user.uid; }
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
          .where('requesterUID', '==', `${this.userId}`)
          .where('visible', '==', true)
          .limit(20))
      .valueChanges();
  }
}
