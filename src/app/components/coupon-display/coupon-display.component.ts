import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Coupon } from 'src/app/models/coupon';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

@Component({
  selector: 'app-coupon-display',
  templateUrl: './coupon-display.component.html',
  styleUrls: ['./coupon-display.component.css']
})
export class CouponDisplayComponent implements OnInit {

  couponMessage: string;

  @Input()
  coupon: Coupon;

  constructor(private service: CustomerService, private snack: MatSnackBar, private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  purchaseCoupon() {
    this.service.purchaseCoupon(this.coupon.id).subscribe((res) => {
      this.couponMessage = res;
      this.showSnack();
      console.log(res);
    },(err)=>{
      alert(err.error);
      console.log(err.error);
    })
  };

  showSnack() {
    let snackRef = this.snack.open(this.couponMessage, "close", { duration: 2000 });
    snackRef.onAction().subscribe(() => {
      //do your stuff here !
      this.snack.dismiss();
    })
  }

  openImage() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxHeight = '400px';
    dialogConfig.maxWidth = '600px';
    dialogConfig.restoreFocus = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      imageUrl: this.coupon.image
    };
    const dialogRef = this.dialog.open(ImageDialogComponent, dialogConfig);
  }

}
