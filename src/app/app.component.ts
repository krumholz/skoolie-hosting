import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { Observable, of } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, public router: Router, public auth: AuthService, public userService: UserService) {}

  ngOnInit() {
    firebase.analytics();
  }

  requstPosition() {
    this.userService.getPosition({ maximumAge: 1500000, timeout: 10000, enableHighAccuracy: true })
      .then((position: any) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const accuracy = position.coords.accuracy;
        console.log({ lat, lng, accuracy });
        this.userService.coords$ = of({ lat, lng, accuracy });
        this.snackBar.open(`lat: ${lat}, lng: ${lng}, accuracy: ${accuracy}`, 'close');
      })
      .catch((err) => {
        console.error(err.message);
        this.snackBar.open(`${err}`, 'close');
      });
  }

}
