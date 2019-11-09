import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private snackBar: MatSnackBar, public auth: AuthService, public userService: UserService) {}

  requstPosition() {
    this.userService.requestPosition().then(pos => {
      this.userService.coords$ = of({lat: pos.lat, lon: pos.lng });
        // .subscribe(res => console.log(res));
      // console.log(`lat: ${pos.lat}, lon: ${pos.lng}`);
      console.log(this.userService.coords$);
      this.snackBar.open(`lat: ${pos.lat}, lon: ${pos.lng}`, 'close');
    });
  }
}
