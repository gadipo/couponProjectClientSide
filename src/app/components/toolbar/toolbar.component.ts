import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { AdminService } from 'src/app/services/admin.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ClientType } from 'src/app/models/client-type.enum';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  
  constructor(public loginService:LoginService, private router:Router) { }
 

  ngOnInit(): void {
  }

  logout(){
    this.loginService.logout().subscribe((res)=>{
      sessionStorage.removeItem('userId');
      this.loginService.loggedIn = false;
      alert(res);
      this.router.navigate(["main"]);
    },(err)=>{
      alert(err.error);
    })
  };

  openUserDetails(){

  }


}
