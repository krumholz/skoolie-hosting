import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  postLocations = [];
  currentLocation = [];
  friendsLocations = [];
  myPosition = [];
  userSub: Subscription;
  myLocationSub: Subscription;
  postLocationsSub: Subscription;
  friendsLocationsSub: Subscription;
  positionLocationSub: Subscription;

  latitude = 40.2023553;
  longitude = -95.4770781;
  mapType = 'roadmap';
  zoomLevel = 5;

  constructor(public auth: AuthService, public userService: UserService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.userSub = this.auth.user$.subscribe(
      observer => {
        if (!!observer) {
          // console.log(observer);
          this.myLocationSub = this.userService
            .getCurrentLocation()
            .subscribe(current => (this.currentLocation = current));
          this.friendsLocationsSub = this.userService
            .getFriendsCurrentLocations()
            .subscribe(friends => (this.friendsLocations = friends));
          this.positionLocationSub = this.userService
            .getCurrentLocation()
            .subscribe(position => (this.myPosition = position));
        } else {
          this.snackBar.open('Log in to share and view locations', 'Close', {
            duration: 6000
          });
          console.log('Log in to share and view locations');
        }
      }
    );

    this.postLocationsSub = this.userService
      .getPostsByLocation()
      .subscribe(posts => (this.postLocations = posts));
  }

  dragMarker(event) {
    // console.log({ lat: event.coords.lat, lon: event.coords.lng });
    this.userService.saveLocation(event);
    // this.selectedMarker = {
    //   lat: event.latitude,
    //   lng: event.longitude
    // };
  }

  ngOnDestroy() {

    this.userSub.unsubscribe();
    this.postLocationsSub.unsubscribe();

    if (this.myLocationSub) {
      this.myLocationSub.unsubscribe();
    }
    if (this.friendsLocationsSub) {
      this.friendsLocationsSub.unsubscribe();
    }
    if (this.positionLocationSub) {
      this.positionLocationSub.unsubscribe();
    }
  }

}
