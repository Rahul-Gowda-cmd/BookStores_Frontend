import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WishListService } from 'src/app/Service/WishList/wish-list.service';
import { BookserviceService } from 'src/app/Service/BookService/bookservice.service';
import { CartserviceService } from 'src/app/Service/cartservice/cartservice.service';

@Component({
  selector: 'app-book-description',
  templateUrl: './book-description.component.html',
  styleUrls: ['./book-description.component.scss'],
})
export class BookDescriptionComponent implements OnInit {
  @Input() bookdetails!: any;
  @Output('init') init: EventEmitter<any> = new EventEmitter();
  FeedbackForm!: FormGroup;
  feedBackList: any = [];

  added = false;
  total = 0;

  constructor(
    private book: BookserviceService,
    private snackBar: MatSnackBar,
    private cartService: CartserviceService,
    private wishlist: WishListService
  ) {}

  ngOnInit(): void {
    this.init.emit();
  }
  AddBooktoCart() {
    if (this.bookdetails['quantity'] > 0) {
      console.log('working', this.bookdetails);
      this.cartService
        .AddBooktoCart(this.bookdetails)
        .subscribe((result: any) => {
          console.log(result.message);
          this.snackBar.open(result.message, '', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'left',
          });
          this.ngOnInit();
        });
    } else {
      this.snackBar.open('Out of Stock! Cant add to  cart', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left',
      });
    }
  }
  AddtoWishList() {
    console.log(this.bookdetails);
    this.wishlist.AddtoWishList(this.bookdetails).subscribe(
      (result: any) => {
        this.snackBar.open(result.message, '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left',
        });
        console.log(result);
      },
      (error) => {
        this.snackBar.open(`${error.error.message}`, '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left',
        });
      }
    );
  }
}
