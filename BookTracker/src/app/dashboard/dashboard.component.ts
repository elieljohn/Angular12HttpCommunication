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

  deleteBook(bookID: number): void {
    console.warn(`Delete book not yet implemented (bookID: ${bookID}).`);
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

}
