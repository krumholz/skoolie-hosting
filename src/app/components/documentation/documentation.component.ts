import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit, OnDestroy {
  toolPosts = [];
  toolsSub: Subscription;

  constructor(public auth: AuthService, public userService: UserService) {}

  ngOnInit() {
    this.toolsSub = this.userService
      .getPostsByTypeTOOLS()
      .subscribe(posts => (this.toolPosts = posts));
  }

  openLink(url) {
    window.open(url);
  }

  ngOnDestroy() {
    this.toolsSub.unsubscribe();
  }
}
