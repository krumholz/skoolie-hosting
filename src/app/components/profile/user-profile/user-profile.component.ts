import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

interface Item {
  [index: number]: { uid: string; displayName: string; email: string; photoURL: string };
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  sharedDoc: AngularFirestoreDocument<any>;
  sharedWith: Observable<any>;
  sharedSub: Subscription;
  userSub: Subscription;

  constructor(public auth: AuthService, public userService: UserService, private snackBar: MatSnackBar, private db: AngularFirestore) {}

  ngOnInit() {
    this.userSub = this.auth.user$.subscribe(
      observer => {
        if (!!observer) {
          this.sharedSub = this.userService
            .locationSharedWith()
            .subscribe(position => (this.sharedWith = position));
        } else {
          this.snackBar.open('Log in to share and view locations', 'Close', {
            duration: 6000
          });
          console.log('Log in to share and view locations');
        }
      }
    );
  }

  ngOnDestroy() {
    this.sharedSub.unsubscribe();
  }

}
