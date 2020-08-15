import { Component, OnInit, Inject } from '@angular/core';
import { Company } from 'src/app/models/company';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {

  company: Company;

  updateCompanyForm: FormGroup;

  messageForUser: string;

  constructor(private dialogRef: MatDialogRef<UpdateCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) data, private fb: FormBuilder, private service: AdminService, private snack: MatSnackBar) { this.company = data.dataToSend }

  ngOnInit(): void {
    this.updateCompanyForm = this.fb.group({
      email: [this.company.email, [Validators.required, Validators.email]],
      password: [this.company.password, Validators.required]
    });
  }


  updateCompany() {
    let company = new Company(this.company.id, this.company.name, this.updateCompanyForm.controls['password'].value,
      this.updateCompanyForm.controls['email'].value, this.company.coupons);
    this.service.updateCompany(company).subscribe((res) => {
      this.messageForUser = res;
      this.showSnack();
      this.dialogRef.close(company);
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
