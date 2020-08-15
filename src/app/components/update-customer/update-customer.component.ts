import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/customer';
import { AdminService } from 'src/app/services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  customer:Customer;

  updateCustomerForm:FormGroup;

  messageForUser:string;
  
  constructor(private dialogRef: MatDialogRef<UpdateCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) data,private fb:FormBuilder, private service:AdminService, private snack:MatSnackBar) {this.customer = data.dataToSend }

  ngOnInit(): void {
    this.updateCustomerForm =this.fb.group({
      firstName:[this.customer.firstName,Validators.required],
      lastName:[this.customer.lastName,Validators.required],
      email:[this.customer.email,[Validators.required,Validators.email]],
      password: [this.customer.password,Validators.required]
    });
  }

    updateCustomer() {
      let customer = new Customer(this.customer.id,this.updateCustomerForm.controls['firstName'].value,
      this.updateCustomerForm.controls['lastName'].value,this.updateCustomerForm.controls['email'].value,
      this.updateCustomerForm.controls['password'].value,this.customer.coupons);
      this.service.updateCustomer(customer).subscribe((res) => {
        this.messageForUser = res;
        this.showSnack();
        this.dialogRef.close(customer);
      }, (err) => {
        alert(err.error);
      });
    }

    showSnack() {
      let snackRef = this.snack.open(this.messageForUser, "close", { duration: 2000 });
      snackRef.onAction().subscribe(() => {
        //do your stuff here !
        this.snack.dismiss();
      })
    }

}
