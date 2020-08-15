import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Category } from 'src/app/models/category.enum';
import { Coupon } from 'src/app/models/coupon';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateCoupon2Component } from './update-coupon2/update-coupon2.component';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { Company } from 'src/app/models/company';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyDetailsComponent } from '../company-details/company-details.component';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(private service: CompanyService, private fb: FormBuilder, private dialog: MatDialog, private snack: MatSnackBar) { }

  addCouponForm: FormGroup;
  searchCouponForm: FormGroup;

  messageForUser: string;

  defaultImage: string = "assets/placeholder-image.jpg";

  coupons: Coupon[];
  company: Company;

  categoryList = Category;
  keys = Object.keys(this.categoryList);

  today: Date = new Date();
  

  ngOnInit(): void {
    this.addCouponForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      startDate: ['', [Validators.required,this.pastValidator]],
      endDate: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      image: ['']
    });

    this.searchCouponForm = this.fb.group({
      searchBy: [''],
      searchCat: ['', Validators.required],
      searchMaxPrice: ['', [Validators.required, Validators.min(1)]]
    });
  }

  searchCoupons() {
    let searchBy = this.searchCouponForm.controls['searchBy'].value;
    let cat = this.searchCouponForm.controls['searchCat'].value;
    let maxPrice = this.searchCouponForm.controls['searchMaxPrice'].value;
    switch (searchBy) {
      case 'category':
        if (cat == '' || cat == null) { break; }
        this.service.getCouponsByCategory(cat).subscribe((res) => {
          this.coupons = res;
        }, (err) => {
          alert(err.error);
          console.log(err.error);
        });
        break;
      case 'maxPrice':
        if (maxPrice == '' || maxPrice == null) { break; }
        this.service.getCouponsBelowPrice(maxPrice).subscribe((res) => {
          this.coupons = res;
        }, (err) => {
          alert(err.error);
          console.log(err.error);
        });
        break;
      default:
        this.service.getCompanyCoupons().subscribe((res) => {
          this.coupons = res;
          console.log(res);
        }, (err) => {
          console.log(err.error);
          alert(err.error);
        });
    }
  }

  editCoupon(coupon: Coupon) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      dataToSend: coupon
    };
    const dialogRef = this.dialog.open(UpdateCoupon2Component, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data == undefined)
        return;
      coupon = data;
      console.log(data);
      console.log(coupon);
    })
  }

  deleteCoupon(coupon: Coupon) {
    this.service.deleteCoupon(coupon.id).subscribe((res) => {
      this.messageForUser = res;
      this.coupons.splice(this.coupons.indexOf(coupon), 1);
      this.showSnack();
    }, (err) => {
      alert(err.error);
      console.log(err.error);
    });
  }

  addCoupon() {
    let title = this.addCouponForm.controls['title'].value;
    let cat = this.addCouponForm.controls['category'].value;
    let description = this.addCouponForm.controls['description'].value;
    let price = this.addCouponForm.controls['price'].value;
    let startDate = this.addCouponForm.controls['startDate'].value;
    if (startDate < this.today) {
      alert('can not pick a start date before today !')
      return;
    }
    let endDate = this.addCouponForm.controls['endDate'].value;
    if (endDate < startDate) {
      alert('can not pick an end date sooner than the start date !')
      return;
    }
    let amount = this.addCouponForm.controls['amount'].value;
    let image = this.addCouponForm.controls['image'].value;
    if (image == null || image == '' || image == undefined) { image = this.defaultImage }
    let coupon: Coupon = new Coupon(0, title, cat, description, price, this.company, startDate, endDate, amount, image);
    this.service.addCoupon(coupon).subscribe((res) => {
      this.messageForUser = res;
      this.showSnack();
      this.formReset(this.addCouponForm);
    }, (err) => {
      alert(err.error);
      console.log(err.error);
    });
  }

  openCompanyDetails() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxHeight = '400px';
    dialogConfig.maxWidth = '600px';
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(CompanyDetailsComponent, dialogConfig);
  }

  formReset(form: FormGroup) {

    form.reset();

    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
  }

  openImage(coupon: Coupon) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxHeight = '400px';
    dialogConfig.maxWidth = '600px';
    dialogConfig.restoreFocus = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      imageUrl: coupon.image
    };
    const dialogRef = this.dialog.open(ImageDialogComponent, dialogConfig);
  }

  showSnack() {
    let snackRef = this.snack.open(this.messageForUser, "close", { duration: 2000 });
    snackRef.onAction().subscribe(() => {
      //do your stuff here !
      this.snack.dismiss();
    })
  }

  pastValidator(control: AbstractControl) {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    let startDate = new Date(control.value);
    if (yesterday > startDate) {
      return { pastError: true };
    }
  }


}
