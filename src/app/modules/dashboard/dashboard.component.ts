import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  nav = false;
  constructor(public userService: UserService, private router: Router) {
    this.userService._nav.subscribe((navState: boolean) => {
      this.nav = navState;
    });
  }

  ngOnInit(): void {}
  onNav() {
    if (this.nav) {
      document.getElementById('mySidenav').style.width = '0';
      document.getElementById('main').style.marginLeft = '0';
      document.getElementById('main-contain').style.marginLeft = '0';
    } else {
      document.getElementById('mySidenav').style.width = '250px';
      document.getElementById('main').style.marginLeft = '150px';
      document.getElementById('main-contain').style.marginLeft = '150px';
    }
    this.nav = !this.nav;
  }
}
