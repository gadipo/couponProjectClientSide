import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Customer } from 'src/app/models/customer';
import { Company } from 'src/app/models/company';
import { Coupon } from 'src/app/models/coupon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateCompanyComponent } from '../update-company/update-company.component';
import { UpdateCustomerComponent } from '../update-customer/update-customer.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service: AdminService, private fb: FormBuilder, private snack: MatSnackBar, private dialog:MatDialog) { }

  customers: Customer[];
  companies: Company[];
  companyEmail: string;
  coupons: Coupon[];

  addCompanyForm: FormGroup;
  searchCompanyForm: FormGroup
  addCustomerForm: FormGroup;
  searchCustomerForm: FormGroup;

  messageForUser: string;


  ngOnInit(): void {
    this.addCompanyForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.addCustomerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // this.searchCompanyForm = this.fb.group({
    //   email: ['']
    // });

    this.searchCustomerForm = this.fb.group({
      email: ['']
    });

   
  }

  searchCompanies() {
    // if (this.searchCompanyForm.controls['email'].value == '') {
    if (this.companyEmail == '' || this.companyEmail == null || this.companyEmail == undefined) {
      this.service.getAllCompanies().subscribe((comps) => {
        this.companies = comps;
        this.messageForUser = null;
      }, (err) => {
        console.log(err);
        this.messageForUser = err.error;
      });
    } else {
      // this.service.getCompanyByEmail(this.searchCompanyForm.controls['email'].value).subscribe((res) => {
      this.service.getCompanyByEmail(this.companyEmail).subscribe((res) => {
        this.companies = new Array(1);
        this.companies[0] = res;
        this.messageForUser = null;
      }, (err) => {
        this.messageForUser = err.error;
        alert(err.error);
      })

    }
  }

  searchCustomers() {
    if (this.searchCustomerForm.controls['email'].value == '') {
      this.service.getAllCustomers().subscribe((cusz) => {
        this.customers = cusz;
        this.messageForUser = null;
      }, (err) => {
        this.messageForUser = err.error;
        alert(err.error);
      });
    } else {
      this.service.getCustomerByEmail(this.searchCustomerForm.controls['email'].value).subscribe((res) => {
        this.customers = new Array(1);
        this.customers[0] = res;
        this.messageForUser = null;
      }, (err) => {
        this.messageForUser = err.error;
        alert(err.error);
      })
    }
  }

  editCompany(company: Company) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus = true;
    dialogConfig.data = {
      dataToSend: company
    };
    const dialogRef = this.dialog.open(UpdateCompanyComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data == undefined)
        return;
      company = data;
      console.log(data);
      console.log(company);
    })
  }

  editCustomer(customer: Customer) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus = true;
    dialogConfig.data = {
      dataToSend: customer
    };
    const dialogRef = this.dialog.open(UpdateCustomerComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data == undefined)
        return;
      customer = data;
      console.log(data);
      console.log(customer);
    })
  }



  deleteCompany(company: Company) {
    this.service.deleteCompany(company.id).subscribe((res) => {
      this.messageForUser = res;
      this.showSnack();
      this.companies.splice(this.companies.indexOf(company), 1);
    }, (err) => {
      this.messageForUser = err.error;
      alert(err.error);
    });
  }




  deleteCustomer(customer: Customer) {
    this.service.deleteCustomer(customer.id).subscribe((res) => {
      this.messageForUser = res;
      this.showSnack();
      this.customers.splice(this.customers.indexOf(customer), 1);
    }, (err) => {
      this.messageForUser = err.error;
      alert(err.error);
    });
  }

  addCompany() {
    let c = new Company(0, this.addCompanyForm.controls['name'].value, this.addCompanyForm.controls['password'].value,
      this.addCompanyForm.controls['email'].value, null)
    this.service.addCompany(c).subscribe((res) => {
      this.messageForUser = res;
      this.showSnack();
      this.formReset(this.addCompanyForm);
    }, (err) => {
      this.messageForUser = err.error;
      alert(err.error);
    });
  }

  addCustomer() {
    let c = new Customer(0, this.addCustomerForm.controls['firstName'].value, this.addCustomerForm.controls['lastName'].value,
      this.addCustomerForm.controls['email'].value, this.addCustomerForm.controls['password'].value, null)
    this.service.addCustomer(c).subscribe((res) => {
      this.messageForUser = res;
      this.showSnack();
      this.formReset(this.addCustomerForm);
    }, (err) => {
      this.messageForUser = err.error;
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

  formReset(form: FormGroup) {

    form.reset();

    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null) ;
    });
}

}
