import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppService} from "@services/app.service";
import {environment} from "../../environments/environment";

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor(private appService:AppService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.appService.user;

    const isLoggedIn = user && user.token;

    const isAppUrl = request.url.startsWith(environment.apiUrl);

    if (isLoggedIn && isAppUrl){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      })
    }

    return next.handle(request);
  }
}
