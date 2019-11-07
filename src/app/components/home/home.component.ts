import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PostService } from 'src/app/services/post/post.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts = [];
  sub: Subscription;

  constructor(public auth: AuthService, public postService: PostService) { }

  ngOnInit() {
    this.sub = this.postService
      .getLocations()
      .subscribe(locations => (this.posts = locations));
  }

  onClick(url) {
    window.open(url);
  }

}
