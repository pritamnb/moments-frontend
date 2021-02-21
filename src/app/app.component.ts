import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'moments-frontend';
  loginState: boolean;
  constructor(public userService: UserService) {
    this.userService._isAuthenticated.subscribe((state: boolean) => {
      this.loginState = state;
    });
  }
}
