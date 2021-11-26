import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WishListService } from 'src/app/Service/WishList/wish-list.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent implements OnInit {
  constructor(
    private wishList: WishListService,
    private snackBar: MatSnackBar
  ) {}
  WishList: any = [];
  ngOnInit(): void {
    this.GetWishList();
  }
  GetWishList() {
    console.log('works');
    this.wishList.GetWishList().subscribe((result: any) => {
      console.log(result);
      this.WishList = result.data;
    });
  }
  RemoveFromWishList(list: any) {
    console.log('works');
    this.wishList.RemoveFromWishList(list._id).subscribe(
      (result: any) => {
        if (result.success == true) {
          this.WishList.splice(this.WishList.indexOf(list), 1);
          this.ngOnInit();
        }
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
