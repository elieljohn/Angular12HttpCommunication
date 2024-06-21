import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`AddHeaderInterceptor - ${req.url}`);

    // Clone the original request object
    let jsonReq: HttpRequest<any> = req.clone({
      // Add header to set Content-Type
      setHeaders: { 'Content-Type': 'application/json' }
    });

    // Pass modified HttpRequest to next.handle
    return next.handle(jsonReq);
  }

}
