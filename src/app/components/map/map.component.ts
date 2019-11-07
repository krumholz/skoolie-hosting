import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  locations = [];
  sub: Subscription;

  latitude = 40.2023553;
  longitude = -95.4770781;
  mapType = 'roadmap';
  zoomLevel = 5;

  constructor(public postService: PostService) { }

  ngOnInit() {
    this.sub = this.postService
      .getLocations()
      .subscribe(locations => (this.locations = locations));
  }

}
