import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookserviceService } from 'src/app/Service/BookService/bookservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isSearch = false;
  books = [];
  new = [];
  option = 'Home';
  sortOption = 0;
  bookId = 0;
  search: any = '';
  getCart: any = [];
  bookdetails: any;
  UserDetails = JSON.parse(localStorage.getItem('BookStoreUser')!);
  p: number = 1;
  constructor(private route: Router, private book: BookserviceService) {}

  ngOnInit(): void {
    this.getBooks();
  }
  getBooks() {
    this.book.getBooks().subscribe((result: any) => {
      this.books = result.data;
      this.new = Array.from(this.books);
      // this.sort();

      console.log(result);
      console.log(this.UserDetails);
    });
  }
  Logout() {
    if (this.UserDetails != null) {
      localStorage.removeItem('BookStoreUser');
      this.route.navigateByUrl('/home');
      location.reload();
    }
  }
  sort(num: any) {
    if (num == 1) {
      this.books.sort((a: any, b: any) => (a.price > b.price ? 1 : -1));
      console.log(this.books);
    } else if (num == 2) {
      this.books.sort((a: any, b: any) => (a.price < b.price ? 1 : -1));
      console.log(this.books);
    } else if (num == 3) {
      this.new.reverse();
      this.books = Array.from(this.new);
      this.new.reverse();
      console.log(this.books);
    }
  }

  Search() {
    if (this.search == '') {
      this.ngOnInit();
    } else {
      this.books = this.books.filter((res: any) => {
        return res.title
          ?.toLocaleLowerCase()
          .match(this.search.toLocaleLowerCase());
      });
    }
  }
}
