import { BookService } from './../../services/book.service';
import { Component, OnInit } from '@angular/core';
import { Book } from '../../common/book';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig } from "@ng-bootstrap/ng-bootstrap"



@Component({
  selector: 'app-book-list',
  //templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  title = 'angular-bookstore';

  books: Book[] = [];

  currentCategoryId: number = 1;
  searchMode: boolean = false;
  previousCategory: number = 1;

  // new properties for server side pagination
  currentPage: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;
 /**
  pageOfItems: Array<Book>;
  pageSize: number = 6; **/
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
              private _activatedRoute: ActivatedRoute, 
              _config: NgbPaginationConfig) {
                _config.maxSize = 3;
                _config.boundaryLinks = true;
               }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(() => {
      this.listBooks();
    })
  }

  pageClick(pageOfItems: Array<Book>){
    // update the current page of items
    //this.pageOfItems = pageOfItems;
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

     // Setting up the current page to 1
     // If user navigates to other category
     if (this.previousCategory != this.currentPage){
       this.currentPage = 1;
     }

     this.previousCategory = this.currentCategoryId;


    this._bookService.getBooks(this.currentCategoryId,
                              this.currentPage - 1,
                              this.pageSize).subscribe(
      /*data => {
        console.log(data);
      } */
      this.processPaginate()
    )
  }

  handleSearchBooks()
  {

    const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');

    this._bookService.searchBooks(keyword, 
      this.currentPage  - 1, 
      this.pageSize).subscribe(
      /**data => {
        // console.log(data);
       this.books = data;
      } **/
      this.processPaginate()
    );
  }

  updatePageSize(pageSize: number){
    //this.pageSize = pageSize;
    this.listBooks();
  }

  processPaginate(){
    return data => {
      this.books = data._embedded.books;
      // page number starts from 1 index
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    }
  }

}
