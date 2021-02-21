import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss'],
})
export class SidenavbarComponent implements OnInit {
  nav = false;

  constructor(private userService: UserService) {
    this.userService._nav.subscribe((navState: boolean) => {
      this.nav = navState;
    });
  }

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
