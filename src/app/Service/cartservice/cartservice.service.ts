import { Injectable } from '@angular/core';
import { HttpserviceService } from '../HttpService/httpservice.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartserviceService {
  user = JSON.parse(localStorage.getItem('BookStoreUser')!);

  constructor(private http: HttpserviceService) {}
  header: any = { headers: { Authorization: 'Bearer ' + this.user.token } };

  AddBooktoCart(book: any) {
    // let params = {
    //   _id: this.user.userId,
    //   product_id: book_id,
    // };
    //this.getToken();
    console.log(book);
    return this.http.post(
      `${environment.baseUrl}api/cart-add-book?bookId=${book._id}&userId=${this.user.userId}`,
      null,
      true,
      this.header
    );
  }

  RemoveBookFromCart(cartId: any) {
    //this.getToken();
    console.log(cartId);
    return this.http.delete(
      `${environment.baseUrl}api/cart-delete-book?cartId=${cartId}`,
      true,
      this.header
    );
  }

  GetCart() {
    console.log(this.user);
    return this.http.get(
      `${environment.baseUrl}api/cart-get-books?userId=${this.user.userId}`,
      true,
      this.header
    );
  }
}
