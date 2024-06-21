import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {

  private requests: any = { };

  constructor() { }

  // Stores the response in the requests object, using the URL as the key
  put(url: string, response: HttpResponse<any>): void {
    this.requests[url] = response;
  }

  // Retrieves the cached response from the requests object and returns it
  // If the response is not found in the cache, it returns undefined
  get(url: string): HttpResponse<any> | undefined {
    return this.requests[url];
  }

  // Sets the value of the cached response for the given URL to undefined, effectively removing it from the cache
  invalidateUrl(url: string): void {
    this.requests[url] = undefined;
  }

  // Sets the requests object to an empty object, effectively clearing the entire cache
  invalidateCache(): void {
    this.requests = { };
  }
}
