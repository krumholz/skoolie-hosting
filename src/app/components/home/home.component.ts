import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts = [];
  sub: Subscription;

  constructor(public auth: AuthService, public userService: UserService) { }

  ngOnInit() {
    this.sub = this.userService
      .getPostsByLocation()
      .subscribe(locations => (this.posts = locations));
  }

  onClick(url) {
    window.open(url);
  }

}
