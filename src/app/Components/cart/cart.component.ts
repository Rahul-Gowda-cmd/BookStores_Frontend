import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserserviceService } from 'src/app/Service/userservice.service';
import { CartserviceService } from 'src/app/Service/cartservice/cartservice.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    private userService: UserserviceService,
    private cartService: CartserviceService,
    private route: Router,
    private snackBar: MatSnackBar
  ) {}
  user = JSON.parse(localStorage.getItem('BookStoreUser')!);
  @Input() cartdetails: any;
  @Output('init') init: EventEmitter<any> = new EventEmitter();
  cart = [1];
  placeorder: any = 'order';
  addedit = false;
  edit = false;
  newadd = false;
  address = false;
  expand = false;
  result1 = 0;
  cartDetails: any = [];
  checked: any;
  radio: string = '';
  AddressForm!: FormGroup;
  userAddress: any;
  ngOnInit(): void {
    this.init.emit();
    console.log(this.cartdetails, 'cart');
    this.AddressForm = new FormGroup({
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
    });
    this.check();
  }
  add(count: any) {
    console.log(parseInt(count) + 1);
  }
  check() {
    if (this.AddressForm.get('address')?.value == '') {
      console.log(this.AddressForm.value);
      this.newadd = true;
    }
  }

  addtoCart(cartbook: any) {
    console.log('working');
    this.cartService.AddBooktoCart(cartbook).subscribe((result: any) => {
      console.log(result.message);
      this.snackBar.open(result.message, '', {
        duration: 5000,
        panelClass: ['black-snackbar'],
      });
      this.GetCart();
    });
  }

  ReduceCount(cartbook: any) {
    console.log('cartbook');
    console.log(cartbook);
    let param = {
      userId: cartbook.userId,
      bookId: cartbook.bookId,
      cartId: cartbook.cartId,
    };
  }
  GetCart() {
    this.cartService.GetCart().subscribe((result: any) => {
      this.cartDetails = result.data;
      console.log(this.cartDetails);
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      };
  }
  RemoveBook(cartbook: any) {
    console.log('cartbook');
    console.log(cartbook);
    this.cartService
      .RemoveBookFromCart(cartbook._id)
      .subscribe((result: any) => {
        console.log(result.message);
        this.cartDetails.splice(this.cartDetails.indexOf(cartbook), 1);
        this.init.emit();
      });
  }
}
