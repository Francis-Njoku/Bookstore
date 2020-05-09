import { BookService } from './../../services/book.service';
import { Component, OnInit } from '@angular/core';
import { Book } from '../../common/book';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-book-list',
  //templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  title = 'angular-bookstore';

  books: Book[];

  currentCategoryId: number;
  searchMode: boolean;
  pageOfItems: Array<Book>;
  pageSize: number = 6;
  /**
  books: Book[] = [
    {
      sku: "text-100",
      name: "C Programming Language",
      description: "Learn C Programming Language",
      unitPrice: 600,
      imageUrl: "assets/images/books/text-100.png",
      active: true,
      unitsInStock: 100,
      createdOn: new Date(),
      updatedOn: null,
    },
    {
      sku: "text-101",
      name: "C# Crash Course",
      description: "Learn C# Programming Language",
      unitPrice: 900,
      imageUrl: "assets/images/books/text-101.png",
      active: true,
      unitsInStock: 100,
      createdOn: new Date(),
      updatedOn: null,
    },
    {
      sku: "text-102",
      name: "C++ Crash Course",
      description: "Learn C++ Programming Language",
      unitPrice: 700,
      imageUrl: "assets/images/books/text-102.png",
      active: true,
      unitsInStock: 100,
      createdOn: new Date(),
      updatedOn: null,
    }
  ] */

  constructor(private _bookService: BookService, 
              private _activatedRoute: ActivatedRoute              ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(() => {
      this.listBooks();
    })
  }

  pageClick(pageOfItems: Array<Book>){
    // update the current page of items
    this.pageOfItems = pageOfItems;
  }

  listBooks()
  {
    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');

    if (this.searchMode){
      // do search work
      this.handleSearchBooks();
    }
    else {
      // display books based on category
      this.handleListBooks();
    }
  }

  handleListBooks()
  {
    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');

     if(hasCategoryId){
       this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
     }
     else {
       this.currentCategoryId = 1;
     }


    this._bookService.getBooks(this.currentCategoryId).subscribe(
      /*data => {
        console.log(data);
      } */
      data => this.books = data
    )
  }

  handleSearchBooks()
  {

    const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');

    this._bookService.searchBooks(keyword).subscribe(
      data => {
        // console.log(data);
        this.books = data;
      }
    )
  }

}
