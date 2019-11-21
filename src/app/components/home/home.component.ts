import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  posts = [];
  locationSub: Subscription;

  constructor(public auth: AuthService, public userService: UserService) {}

  ngOnInit() {
    this.locationSub = this.userService
      .getPostsByLocation()
      .subscribe(locations => (this.posts = locations));
  }

  openLink(url) {
    window.open(url);
  }

  ngOnDestroy() {
    this.locationSub.unsubscribe();
  }
}
