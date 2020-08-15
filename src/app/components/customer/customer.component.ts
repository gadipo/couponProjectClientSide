import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CouponDisplayComponent } from '../coupon-display/coupon-display.component';
import { Coupon } from 'src/app/models/coupon';
import { Category } from 'src/app/models/category.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from 'src/app/models/customer';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  searchCouponForm: FormGroup;
  couponMessage: string;

  coupons: Coupon[];
  filteredCoupons: Coupon[] = new Array(0);

  customer: Customer;

  categoryList = Category;
  keys = Object.keys(this.categoryList);

  constructor(private service: CustomerService, private fb: FormBuilder, private snack: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.getAllCoupons().subscribe((res) => {
      this.coupons = res;
      console.log(res);
    }, (err) => {
      this.couponMessage = err.error;
      console.log(err.error);
    });

    this.searchCouponForm = this.fb.group({
      searchBy: [''],
      searchCat: ['', Validators.required],
      searchMaxPrice: ['', [Validators.required, Validators.min(1)]]
    });
  }

  searchCoupons() {
    this.couponMessage = '';
    let searchBy = this.searchCouponForm.controls['searchBy'].value;
    let cat = this.searchCouponForm.controls['searchCat'].value;
    let maxPrice = this.searchCouponForm.controls['searchMaxPrice'].value;
    switch (searchBy) {
      case 'category':
        if (cat == '' || cat == null) { break; }
        this.filteredCoupons = this.coupons.filter(({ category }) => category == cat);
        if (this.filteredCoupons.length == 0) {
          this.couponMessage = "No Coupons Found!";
          this.showSnack();
        }
        break;
      case 'maxPrice':
        let max = parseFloat(maxPrice);
        this.filteredCoupons = this.coupons.filter(({ price }) => price <= max);
        if (this.filteredCoupons.length == 0) {
          this.couponMessage = "No Coupons Found!";
          this.showSnack();
        }
        break;
      case 'myCoupons':
        this.service.getCustomerCoupons().subscribe((res)=>{
          this.filteredCoupons = res;
          console.log(res);
        },(err)=>{
          alert(err.error);
          console.log(err.error);
        })
        break;
      default: this.ngOnInit();
    }
  }

  showSnack() {
    let snackRef = this.snack.open(this.couponMessage, "close", { duration: 2000 });
    snackRef.onAction().subscribe(() => {
      //do your stuff here !
      this.snack.dismiss();
    });
  }

  openCustomerDetails() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxHeight = '400px';
    dialogConfig.maxWidth = '600px';
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(CustomerDetailsComponent, dialogConfig);
  }


}
