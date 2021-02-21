import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public userService: UserService) {
    this.userService._nav.subscribe((navState: boolean) => {
      this.nav = navState;
    });
  }
  nav = false;
  ngOnInit(): void {}
  onNav() {
    if (this.nav) {
      document.getElementById('mySidenav').style.width = '0';
      document.getElementById('main').style.marginLeft = '0';
    } else {
      document.getElementById('mySidenav').style.width = '250px';
      document.getElementById('main').style.marginLeft = '150px';
    }
    this.nav = !this.nav;
    this.userService.setNavState(this.nav);
  }
}
