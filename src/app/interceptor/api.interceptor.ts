import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.userService.getToken();
    if (token) {
      const clonedRequest = request.clone({
        headers: request.headers.append('x-access-token', `${token}`),
      });
      return next.handle(clonedRequest);
    } else {
      return next.handle(request);
    }
  }
}
