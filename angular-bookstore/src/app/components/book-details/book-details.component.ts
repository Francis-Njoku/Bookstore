import { ActivatedRoute } from '@angular/router';
import { BookService } from './../../services/book.service';
import { BookCategory } from './../../common/book-category';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book = new Book();


  constructor(private _activatedRoute: ActivatedRoute, 
              private _bookService: BookService) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(
      () => {
        this.getBookInfo();
      }
    )
  }

  getBookInfo() {
    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');

    this._bookService.get(id).subscribe(
      data => {
        //console.log(data);
        this.book = data;
      }
    )
  }

}
