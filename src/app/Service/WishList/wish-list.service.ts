import { Injectable } from '@angular/core';
import { HttpserviceService } from '../HttpService/httpservice.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  user = JSON.parse(localStorage.getItem('BookStoreUser')!);
  constructor(private http: HttpserviceService) {}
  header: any = { headers: { Authorization: 'Bearer ' + this.user.token } };

  AddtoWishList(book: any) {
    console.log(book._id);
    console.log(this.user.userId);
    let params = {
      UserId: parseInt(this.user.userId),
      BookId: parseInt(book.bookId),
    };
    //this.getToken();
    return this.http.post(
      `${environment.baseUrl}api/wishlist-add-book?bookId=${book._id}&userId=${this.user.userId}`,
      null,
      true,
      this.header
    );
  }

  GetWishList() {
    //this.getToken();
    return this.http.get(
      `${environment.baseUrl}api/wishlist-get-books?userId=${this.user.userId}`,
      true,
      this.header
    );
  }

  RemoveFromWishList(list: any) {
    //this.getToken();
    return this.http.delete(
      `${environment.baseUrl}api/wishlist-delete-book?wishlistId=${list}`,
      true,
      this.header
    );
  }
}
