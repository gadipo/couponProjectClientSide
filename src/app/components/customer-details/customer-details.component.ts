import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customer:Customer;

  constructor(private service:CustomerService) { }

  ngOnInit(): void {
    this.service.getCustomerDetails().subscribe((res)=>{
      this.customer = res;
      console.log(res);
    },(err)=>{
      alert(err.error);
      console.log(err.error);
    })
  }

}
