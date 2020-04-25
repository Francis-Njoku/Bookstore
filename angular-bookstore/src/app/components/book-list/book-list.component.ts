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

  listBooks()
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

}
