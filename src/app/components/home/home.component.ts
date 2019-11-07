import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocationService } from 'src/app/services/location/location.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts = [];
  sub: Subscription;

  constructor(public auth: AuthService, public locationService: LocationService) { }

  ngOnInit() {
    this.sub = this.locationService
      .getLocations()
      .subscribe(locations => (this.posts = locations));
  }

  onClick(url) {
    window.open(url);
  }

}
