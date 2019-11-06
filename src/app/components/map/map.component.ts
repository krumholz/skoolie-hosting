import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  latitude = 35.9853927;
  longitude = -96.307165;
  mapType = 'roadmap';

  constructor() { }

  ngOnInit() {
  }

}
