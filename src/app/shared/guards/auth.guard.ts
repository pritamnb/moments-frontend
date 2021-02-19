import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
  CanActivate,
  CanActivateChild,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthCanActivateGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  private canActivateGenericMethod(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      this.userService.logout();
      return this.router.createUrlTree(['/login']);
    }
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.canActivateGenericMethod(route, state);
  }
}
