import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { allBooks, allReaders } from 'app/data';
import { Reader } from "app/models/reader";
import { Book } from "app/models/book";
import { BookTrackerError } from 'app/models/bookTrackerError';
import { OldBook } from 'app/models/oldBook';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  mostPopularBook: Book = allBooks[0];

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Reader[] {
    return allReaders;
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  // GET request to the /api/books endpoint
  getAllBooks(): Observable<Book[]> {
    console.log('Getting all books from the server');
    return this.http.get<Book[]>('/api/books');
  }

  // Retrieve a specific book from the server
  getBookById(id: number): Observable<Book> {
    // Make an HTTP GET request to the server
    return this.http.get<Book>(`/api/books/${id}`, {
      // Specify the HTTP headers to include in the request
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-token'
      })
    });
  }

  // Retrieves books by IDs and transforms the response to an OldBook object by piping through map
  getOldBookById(id: number): Observable<OldBook> {
    return this.http.get<Book>(`/api/bookd/${id}`)
      .pipe(
        map(b => <OldBook>{
          bookTitle: b.title,
          year: b.publicationYear
        }),
        tap(classicBook => console.log('Old Book:', classicBook))
      );
  }

  // Sends an HTTP POST request to the server with the newBook object
  // Server should respond with a newly added book, returned as an Observable<Book>
  addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>('/api/books', newBook, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Sends an HTTP POST with the updatedBook object
  // Server should update the book and return a void response
  updateBook(updatedBook: Book): Observable<void> {
    return this.http.put<void>(`/api/books/${updatedBook.bookID}`, updatedBook, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Sends an HTTP DELETE request to the server
  // Server should delete the book with the specified bookID and return void
  deleteBook(bookID: number): Observable<void> {
    return this.http.delete<void>(`/api/books/${bookID}`);
  }
}
