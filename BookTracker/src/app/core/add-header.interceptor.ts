import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpContextToken } from '@angular/common/http';
import { Observable } from 'rxjs';

// Creates a reusable token that can be used to store and retrieve the Content-Type header value for HTTP requests
export const CONTENT_TYPE = new HttpContextToken(() => 'application/json')

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`AddHeaderInterceptor - ${req.url}`);

    // Clone the original request object
    let jsonReq: HttpRequest<any> = req.clone({
      // Add header to set Content-Type
      setHeaders: { 'Content-Type': req.context.get(CONTENT_TYPE) }
    });

    // Pass modified HttpRequest to next.handle
    return next.handle(jsonReq);
  }

}
