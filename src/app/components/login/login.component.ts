import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientType } from 'src/app/models/client-type.enum';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { AdminService } from 'src/app/services/admin.service';
import { CustomerService } from 'src/app/services/customer.service';
import { CompanyComponent } from '../company/company.component';
import { CustomerComponent } from '../customer/customer.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: LoginService, private router: Router,private dialogRef: MatDialogRef<LoginComponent>) { }

  loginForm: FormGroup;

  errorMessage: string;


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      client: ['', Validators.required]
    });
  }

  public login() {
    this.service.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value,
      this.loginForm.controls['client'].value).subscribe((token) => {
        sessionStorage.setItem('userId', token);
        this.service.loggedIn = true;
        switch (this.loginForm.controls['client'].value) {
          case "Administrator":
            this.router.navigate(["admin"]);
            this.dialogRef.close();
            break;
          case "Company":
            this.router.navigate(["company"]);
            this.dialogRef.close();
            break;
          case "Customer":
            this.router.navigate(["customer"]);
            this.dialogRef.close();
            break;
        }
      }, (err) => {
        this.errorMessage = err.error;
        console.log(err.error);
      });
  }

  logout(){
    this.service.logout().subscribe((res)=>{
      sessionStorage.removeItem('userId');
      this.service.loggedIn = false;
      alert(res);
      this.router.navigate(["main"]);
    },(err)=>{
      alert(err.error);
    })
  };

}
