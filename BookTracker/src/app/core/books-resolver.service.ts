import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

import { Book } from "app/models/book";
import { DataService } from "./data.service";
import { BookTrackerError } from "app/models/bookTrackerError";

@Injectable({
    providedIn: 'root'
})
export class BooksResolverService implements Resolve<Book[] |  BookTrackerError> {

  constructor(private dataService: DataService) { }

  // Called by the Angular router when a route that uses this resolver is activated
  // Returns an array of Book objects or a BookTrackerError object
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book[] | BookTrackerError> {
    return this.dataService.getAllBooks() // Makes an HTTP request to fetch the list of books
      .pipe(
        catchError(err => of(err))
      );
  }

}
