import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators'

import { Observable } from 'rxjs';
import {LoadingService} from "@services/loading.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private _loading: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._loading.setLoading(true, request.url);
    return next.handle(request)
      .pipe(catchError((err) => {
        this._loading.setLoading(false, request.url);
        return err;
      }))
      .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this._loading.setLoading(false, request.url);
        }
        return evt;
      }));

  }
}
