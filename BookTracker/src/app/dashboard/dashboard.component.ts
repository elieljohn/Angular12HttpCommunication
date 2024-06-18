import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { Book } from "app/models/book";
import { Reader } from "app/models/reader";
import { DataService } from 'app/core/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private dataService: DataService,
              private title: Title) { }

  ngOnInit() {
    // Fetch the list of books from the server and store the result in the allBooks property of the component
    this.dataService.getAllBooks()
      .subscribe(
        // Success handler: called when the Observable emits a new value (array of Book objects)
        // Assigns the emitted data to the allBooks property of the component
        (data: Book[]) => this.allBooks = data,

        // Error handler: called when an error occurs
        (err: any) => console.log(err),

        // Completion handler: called whn the Observable complets
        () => console.log('Getting all books complete')
      );

    this.allReaders = this.dataService.getAllReaders();
    this.mostPopularBook = this.dataService.mostPopularBook;

    this.title.setTitle(`Book Tracker`);
  }

  // Calls the deleteBook to send an HTTP DELETE request to the server to delete the book with the specified bookID
  // If the deletion is successful, the method removes the deleted book from the allBooks array
  deleteBook(bookID: number): void {
    this.dataService.deleteBook(bookID)
      .subscribe(
        (data: void) => {
          let index: number = this.allBooks.findIndex(book => book.bookID === bookID);
          this.allBooks.splice(index, 1);
        },
        (err: any) => console.log(err)
      );
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

}
