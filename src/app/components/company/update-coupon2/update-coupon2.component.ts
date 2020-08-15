import { Component, OnInit, Inject } from '@angular/core';
import { Category } from 'src/app/models/category.enum';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Coupon } from 'src/app/models/coupon';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CompanyService } from 'src/app/services/company.service';
import { ImageDialogComponent } from '../../image-dialog/image-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-update-coupon2',
  templateUrl: './update-coupon2.component.html',
  styleUrls: ['./update-coupon2.component.css']
})
export class UpdateCoupon2Component implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<UpdateCoupon2Component>,
    @Inject(MAT_DIALOG_DATA) data,
    private service: CompanyService,
    private fb: FormBuilder,
    private snack:MatSnackBar
    ) { this.coupon = data.dataToSend }

  coupon: Coupon;

  updateCouponForm: FormGroup;

  updateCouponMessage: string;

  today: string = new Date().toJSON().split('T')[0];

  defaultImage: string = "assets/placeholder-image.jpg";

  ngOnInit(): void {
    this.updateCouponForm = this.fb.group({
      title: [this.coupon.title, Validators.required],
      description: [this.coupon.description, Validators.required],
      price: [this.coupon.price, [Validators.required, Validators.min(1)]],
      startDate: [this.coupon.startDate, [Validators.required,this.pastValidator]],
      endDate: [this.coupon.endDate, Validators.required],
      amount: [this.coupon.amount, [Validators.required, Validators.min(1)]],
      image: [this.coupon.image]
    });
  }

  updateCoupon() {
    let title = this.updateCouponForm.controls['title'].value;
    let description = this.updateCouponForm.controls['description'].value;
    let price = this.updateCouponForm.controls['price'].value;
    let startDate = this.updateCouponForm.controls['startDate'].value;
    if (startDate < this.today) {
      alert('can not pick a start date before today !')
      return;
    }
    let endDate = this.updateCouponForm.controls['endDate'].value;
    if (endDate < startDate) {
      alert('can not pick an end date sooner than the start date !')
      return;
    }
    let amount = this.updateCouponForm.controls['amount'].value;
    let image = this.updateCouponForm.controls['image'].value;
    if (image == null || image == '' || image == undefined) { image = this.defaultImage }
    let coupon: Coupon = new Coupon(this.coupon.id, title, this.coupon.category, description, price, this.coupon.company, startDate, endDate, amount, image);
    this.service.updateCoupon(coupon).subscribe((res) => {
      this.coupon = coupon;
      this.updateCouponMessage = res;
      this.showSnack();
      this.dialogRef.close(coupon);
    }, (err) => {
      this.updateCouponMessage = err.error;
      alert(err.error);
      console.log(err.error);
    })

  }

  close() {
    this.dialogRef.close();
  }

  showSnack() {
    let snackRef = this.snack.open(this.updateCouponMessage, "close", { duration: 2000 });
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
