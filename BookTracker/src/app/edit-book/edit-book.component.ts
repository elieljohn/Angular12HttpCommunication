import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from 'app/models/book';
import { DataService } from 'app/core/data.service';
import { OldBook } from 'app/models/oldBook';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styles: []
})
export class EditBookComponent implements OnInit {

  selectedBook: Book;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    let bookID: number = parseInt(this.route.snapshot.params['id']);

    // Fetch a single book from the server based on the provided bookID parameter and
    // store the result in the selectedBook property of the component
    // Call getBookById to make an HTTP GET request to the server to retrieve a single book based on the provided bookID
    this.dataService.getBookById(bookID)
      .subscribe(
        // Store the emitted Book object to selectedBook
        (data: Book) => this.selectedBook = data,
        (err: any) => console.log(err)
      );

    // Call getOldBookById to make an HTTP GET request and log the book title
    this.dataService.getOldBookById(bookID)
      .subscribe(
        (data: OldBook) => console.log(`Old Book:', ${data.bookTitle}`)
      );
  }

  setMostPopular(): void {
    this.dataService.setMostPopularBook(this.selectedBook);
  }

  // Calls the updateBook method to send an HTTP PUT request to the server with the updated selectedBook object
  saveChanges(): void {
    this.dataService.updateBook(this.selectedBook)
      .subscribe(
        (data: void) => console.log(`${this.selectedBook.title} updated!`),
        (err: any) => console.log(err)
      );
  }
}
