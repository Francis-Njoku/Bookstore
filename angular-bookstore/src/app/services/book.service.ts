import { Book } from './../common/book';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = "http://localhost:8080/api/v1/books";

  constructor(private httpClient: HttpClient) { }

  getBooks(theCategoryId: number): Observable<Book[]>{
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
      // map takes response as a parameter
      map(response => response._embedded.books)

    );

  }
}

// Remove the "_embedded from the api"
interface GetResponseBooks{
  _embedded: {
    books: Book[];
  }
}
